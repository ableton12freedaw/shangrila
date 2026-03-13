import os
from pathlib import Path
from uuid import uuid4

import pytest
import requests
from dotenv import dotenv_values

# Admission enquiries API tests - health check and admission enquiry CRUD


def _resolve_base_url() -> str:
    backend_url = os.environ.get("REACT_APP_BACKEND_URL")
    if not backend_url:
        frontend_env = Path("/app/frontend/.env")
        if frontend_env.exists():
            env_values = dotenv_values(frontend_env)
            backend_url = env_values.get("REACT_APP_BACKEND_URL")

    if not backend_url:
        pytest.fail("REACT_APP_BACKEND_URL is not configured")

    return backend_url.rstrip("/")


BASE_URL = _resolve_base_url()
API_BASE = f"{BASE_URL}/api"


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


# Health check endpoint tests
class TestHealthEndpoint:
    """Tests for GET /api/health endpoint"""

    def test_health_endpoint_returns_status_ok(self, api_client):
        response = api_client.get(f"{API_BASE}/health", timeout=10)
        assert response.status_code == 200

        data = response.json()
        assert data.get("status") == "ok"


# Admission enquiries endpoint tests
class TestAdmissionEnquiriesEndpoint:
    """Tests for /api/admission-enquiries CRUD endpoints"""

    def _build_admission_payload(self, suffix: str) -> dict:
        return {
            "parent_name": f"TEST Parent {suffix}",
            "email": f"test.parent.{suffix.lower()}@example.com",
            "phone": "+919876543210",
            "student_name": f"TEST Student {suffix}",
            "grade": "Grade 5",
            "message": "TEST Please provide admission information and fee structure.",
        }

    def test_post_admission_enquiry_creates_and_returns_data(self, api_client):
        """Test POST /api/admission-enquiries creates enquiry and returns saved data"""
        suffix = uuid4().hex[:8]
        payload = self._build_admission_payload(suffix)

        response = api_client.post(f"{API_BASE}/admission-enquiries", json=payload, timeout=20)
        assert response.status_code == 200

        data = response.json()
        # Verify ID and timestamp generated
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert isinstance(data.get("submitted_at"), str) and "T" in data["submitted_at"]

        # Verify all submitted fields are returned
        assert data["parent_name"] == payload["parent_name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["student_name"] == payload["student_name"]
        assert data["grade"] == payload["grade"]
        assert data["message"] == payload["message"]

    def test_post_admission_enquiry_with_optional_fields_null(self, api_client):
        """Test POST /api/admission-enquiries with minimal required fields only"""
        suffix = uuid4().hex[:8]
        payload = {
            "parent_name": f"TEST MinParent {suffix}",
            "email": f"test.minparent.{suffix.lower()}@example.com",
            "phone": "+911234567890",
            "message": "TEST Minimal admission enquiry without optional fields.",
        }

        response = api_client.post(f"{API_BASE}/admission-enquiries", json=payload, timeout=20)
        assert response.status_code == 200

        data = response.json()
        assert data["parent_name"] == payload["parent_name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["message"] == payload["message"]
        # Optional fields should be null
        assert data.get("student_name") is None
        assert data.get("grade") is None

    def test_get_admission_enquiries_returns_list(self, api_client):
        """Test GET /api/admission-enquiries returns list of enquiries"""
        # First create an enquiry to ensure list is not empty
        suffix = uuid4().hex[:8]
        payload = self._build_admission_payload(suffix)
        create_response = api_client.post(f"{API_BASE}/admission-enquiries", json=payload, timeout=20)
        assert create_response.status_code == 200
        created = create_response.json()

        # Now retrieve list
        response = api_client.get(f"{API_BASE}/admission-enquiries", timeout=20)
        assert response.status_code == 200

        items = response.json()
        assert isinstance(items, list)
        assert len(items) > 0

        # Verify created item exists in list
        matched = next((item for item in items if item.get("id") == created["id"]), None)
        assert matched is not None
        assert matched["parent_name"] == payload["parent_name"]
        assert matched["email"] == payload["email"]

    def test_post_admission_enquiry_rejects_invalid_email(self, api_client):
        """Test POST /api/admission-enquiries rejects invalid email format"""
        suffix = uuid4().hex[:8]
        payload = {
            "parent_name": f"TEST BadEmail {suffix}",
            "email": "invalid-email-format",
            "phone": "+919876543210",
            "message": "TEST This should be rejected.",
        }

        response = api_client.post(f"{API_BASE}/admission-enquiries", json=payload, timeout=20)
        assert response.status_code == 422

        data = response.json()
        assert "detail" in data

    def test_post_admission_enquiry_rejects_missing_required_fields(self, api_client):
        """Test POST /api/admission-enquiries rejects missing required fields"""
        # Missing parent_name, email, phone, message
        payload = {
            "student_name": "TEST No Required Fields",
        }

        response = api_client.post(f"{API_BASE}/admission-enquiries", json=payload, timeout=20)
        assert response.status_code == 422

        data = response.json()
        assert "detail" in data


# Contact messages endpoint test (for regression)
class TestContactMessagesEndpoint:
    """Regression test for contact messages endpoint"""

    def test_post_contact_message_still_works(self, api_client):
        """Test POST /api/contact-messages still works after admission enquiry changes"""
        suffix = uuid4().hex[:8]
        payload = {
            "name": f"TEST Regression {suffix}",
            "email": f"test.regression.{suffix.lower()}@example.com",
            "phone": "+919999888777",
            "subject": "TEST Contact Regression Check",
            "message": "TEST Verifying contact messages endpoint still functions correctly.",
        }

        response = api_client.post(f"{API_BASE}/contact-messages", json=payload, timeout=20)
        assert response.status_code == 200

        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert isinstance(data.get("id"), str)
