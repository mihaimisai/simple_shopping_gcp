from fastapi import FastAPI, Request, Depends, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .firebase_utils import db
from firebase_admin import auth

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


async def get_current_user(request: Request):

    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing auth token",
        )

    token = auth_header.split("Bearer ")[1]

    try:

        decoded_token = auth.verify_id_token(token)
        user_id = decoded_token["uid"]
        return user_id

    except Exception as e:

        raise HTTPException(
            status_code=401,
            detail=f"Token verification failed: {str(e)}",
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
        raise HTTPException(
            status_code=500, detail=f"Error retrieving data: {e}"
        )  # noqa


@app.get("/add")
async def add():
    return {}


@app.get("/delete")
async def delete():
    return {}
