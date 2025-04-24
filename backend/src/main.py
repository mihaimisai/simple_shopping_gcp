from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .firebase_utils import db, logging
from pydantic import BaseModel
from .get_current_user import get_current_user

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


@app.get("/healthcheck")
async def check():
    return {"status": 200}


@app.get("/retrievelist")
async def retrieve(current_user=Depends(get_current_user)):

    try:

        user_doc = (
            db.collection("users")
            .document(current_user)
            .collection("items")
            .stream()  # noqa
        )

        return user_doc

    except Exception as e:
        logging.error(f"Error retrieving data: {e}")
        raise HTTPException(
            status_code=500, detail=f"Error retrieving data: {e}"
        )  # noqa


class Item(BaseModel):
    itemName: str


@app.post("/add")
async def add(item: Item, current_user=Depends(get_current_user)):

    try:

        db.collection("users").document(current_user).collection("items").add(
            item.itemName
        )  # noqa

        return "Item added successfully"

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding item: {e}")


@app.get("/delete")
async def delete():
    return {}
