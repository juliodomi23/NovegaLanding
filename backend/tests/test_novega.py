"""Backend tests for Grupo Novega API"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestHealth:
    def test_api_root(self):
        r = requests.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        assert r.json().get("message") == "Grupo Novega API - OK"


class TestContact:
    def test_post_contact(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "email": "TEST_user@example.com",
            "phone": "+52 961 000 0000",
            "message": "Test message from automated test"
        })
        assert r.status_code == 200
        data = r.json()
        assert data.get("success") is True
        assert "message" in data

    def test_post_contact_job_application(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Applicant",
            "email": "TEST_applicant@example.com",
            "phone": "+52 961 000 0001",
            "message": "Applying for Agente de Ventas",
            "msg_type": "job_application"
        })
        assert r.status_code == 200
        assert r.json().get("success") is True

    def test_get_contact_messages(self):
        r = requests.get(f"{BASE_URL}/api/contact")
        assert r.status_code == 200
        assert isinstance(r.json(), list)

    def test_post_contact_missing_required(self):
        """Missing required fields should return validation error"""
        r = requests.post(f"{BASE_URL}/api/contact", json={"name": "TEST_Only"})
        assert r.status_code == 422
