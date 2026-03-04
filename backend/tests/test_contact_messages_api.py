import os
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

# Contact messages API smoke + persistence flow tests


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


def test_post_contact_message_saves_and_returns_payload(api_client):
    payload = {
        "name": "TEST QA Runner",
        "email": "test.qa.runner@example.com",
        "phone": "+919999000111",
        "subject": "TEST Admission Enquiry",
        "message": "TEST Please share admissions timeline and fee details.",
    }

    response = api_client.post(f"{API_BASE}/contact-messages", json=payload, timeout=20)
    assert response.status_code == 200

    data = response.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["phone"] == payload["phone"]
    assert data["subject"] == payload["subject"]
    assert data["message"] == payload["message"]
    assert isinstance(data["id"], str) and len(data["id"]) > 0
    assert isinstance(data["submitted_at"], str) and "T" in data["submitted_at"]


def test_get_contact_messages_returns_saved_submission(api_client):
    unique_subject = "TEST Retrieval Check 2026"
    payload = {
        "name": "TEST Retrieval User",
        "email": "test.retrieval@example.com",
        "phone": "+918888777666",
        "subject": unique_subject,
        "message": "TEST Verifying submission retrieval via GET endpoint.",
    }

    create_response = api_client.post(f"{API_BASE}/contact-messages", json=payload, timeout=20)
    assert create_response.status_code == 200
    created = create_response.json()
    created_id = created["id"]

    get_response = api_client.get(f"{API_BASE}/contact-messages", timeout=20)
    assert get_response.status_code == 200

    items = get_response.json()
    assert isinstance(items, list)
    assert len(items) > 0

    matched = next((item for item in items if item.get("id") == created_id), None)
    assert matched is not None
    assert matched["subject"] == unique_subject
    assert matched["name"] == payload["name"]
    assert matched["email"] == payload["email"]
    assert matched["message"] == payload["message"]
