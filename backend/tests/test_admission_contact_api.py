import os
from pathlib import Path
from uuid import uuid4

import pytest
import requests
from dotenv import dotenv_values

# Contact admission enquiry API regression tests (extended fields + persistence)


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


def _build_extended_payload(suffix: str) -> dict:
    return {
        "student_name": f"TEST Student {suffix}",
        "date_of_birth": "2016-05-10",
        "grade_standard": "Grade 5",
        "academic_year": "2026-2027",
        "parent_guardian_name": f"TEST Guardian {suffix}",
        "residential_address": "TEST Address, Hingna, Nagpur",
        "transport_required": "Yes",
        "name": f"TEST Contact {suffix}",
        "email": f"test.{suffix.lower()}@example.com",
        "phone": "+919876543210",
        "subject": f"TEST Admission Enquiry {suffix}",
        "message": "TEST Please share fee structure, admission process, and required documents.",
    }


def test_post_contact_message_accepts_extended_admission_fields(api_client):
    suffix = uuid4().hex[:8]
    payload = _build_extended_payload(suffix)

    response = api_client.post(f"{API_BASE}/contact-messages", json=payload, timeout=20)
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data.get("id"), str) and len(data["id"]) > 0
    assert isinstance(data.get("submitted_at"), str) and "T" in data["submitted_at"]

    for field in payload:
        assert data[field] == payload[field]


def test_get_contact_messages_returns_new_extended_submission(api_client):
    suffix = uuid4().hex[:8]
    payload = _build_extended_payload(suffix)

    create_response = api_client.post(f"{API_BASE}/contact-messages", json=payload, timeout=20)
    assert create_response.status_code == 200
    created = create_response.json()

    get_response = api_client.get(f"{API_BASE}/contact-messages", timeout=20)
    assert get_response.status_code == 200

    items = get_response.json()
    assert isinstance(items, list)
    assert len(items) > 0

    matched = next((item for item in items if item.get("id") == created["id"]), None)
    assert matched is not None

    for field in payload:
        assert matched[field] == payload[field]


def test_post_contact_message_rejects_invalid_email(api_client):
    suffix = uuid4().hex[:8]
    payload = _build_extended_payload(suffix)
    payload["email"] = "not-an-email"

    response = api_client.post(f"{API_BASE}/contact-messages", json=payload, timeout=20)
    assert response.status_code == 422

    data = response.json()
    assert "detail" in data
