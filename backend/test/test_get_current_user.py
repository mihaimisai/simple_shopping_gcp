from fastapi.testclient import TestClient
from backend.src.main import app
from unittest.mock import patch

client = TestClient(app)


@patch("firebase_admin.auth.verify_id_token")
def test_get_current_user_valid_token(mock_verify):

    mock_verify.return_value = {"uid": "test-user-id"}

    response = client.get(
        "/retrievelist", headers={"Authorization": "Bearer fake-valid-token"}
    )

    assert response.status_code != 401


@patch("firebase_admin.auth.verify_id_token")
def test_get_current_user_invalid_token(mock_verify):

    mock_verify.side_effect = Exception("Invalid token")

    response = client.get(
        "/retrievelist", headers={"Authorization": "Bearer fake-invalid-token"}
    )

    assert response.status_code == 401
    assert (
        response.json()["detail"] == "Token verification failed: Invalid token"
    )  # noqa
