from fastapi.testclient import TestClient
from backend.src.main import app


client = TestClient(app)


def test_healthcheck():
    response = client.get("/healthcheck")
    assert response.status_code == 200
    assert response.json() == {"status": 200}


def test_retrieve_list_empty_list():

    pass


def test_retrieve_list_one_item_list():

    pass


def test_retrieve_list_multiple_items_list():

    pass


def test_retrieve_list_error():

    pass
