from fastapi import FastAPI, Request, Depends, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .firebase_utils import db, logging
from firebase_admin import auth
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://simple-shopping-gcp.web.app",  # Live 1
    "https://simple-shopping-gcp.firebaseapp.com",  # Live 2
    "https://simple-shopping-gcp--dev-i73pz20n.web.app",  # Dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_current_user(request: Request):

    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        logging.error("Invalid or missing auth token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing auth token",
        )

    token = auth_header.split("Bearer ")[1]

    try:

        decoded_token = auth.verify_id_token(token)
        return decoded_token

    except Exception as e:
        logging.error(f"Token verification failed: {str(e)}")
        raise HTTPException(
            status_code=401,
            detail=f"Token verification failed: {str(e)}",
        )


@app.get("/healthcheck")
def check():
    return {"status": 200}


@app.get("/retrievelist")
def retrieve(current_user=Depends(get_current_user)):

    try:
        items_collection = (
            db.collection("users")
            .document(current_user["uid"])
            .collection("items")  # noqa
        )

        items = [
            {"id": doc.id, **doc.to_dict()}
            for doc in items_collection.stream()  # noqa
        ]

        return items

    except Exception as e:
        logging.error(f"Error retrieving data: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error retrieving data: {e}"
        )  # noqa


class Item(BaseModel):
    itemName: str


@app.post("/add")
def add(item: Item, current_user=Depends(get_current_user)):

    try:

        items_collection = (
            db.collection("users")
            .document(current_user["uid"])
            .collection("items")  # noqa
        )

        items_collection.add({"itemName": item.itemName})

        return {"message": "Item added successfully"}

    except Exception as e:
        logging.error(f"Error adding item: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error adding item: {e}",
        )


@app.delete("/delete/{item_id}")
def delete(item_id: str, current_user=Depends(get_current_user)):

    try:
        items_ref = (
            db.collection("users")
            .document(current_user["uid"])
            .collection("items")
            .document(item_id)  # noqa
        )

        doc = items_ref.get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Item not found")

        items_ref.delete()

        return {"message": "Item deleted"}

    except Exception as e:
        logging.error(f"Error deleting item: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting item: {e}",
        )
