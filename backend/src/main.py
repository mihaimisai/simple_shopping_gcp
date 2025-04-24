from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .firebase_utils import db


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
async def retrieve(request: Request):
    auth_header = request.headers.get("Authorization")
    print(auth_header)

    user_doc = db.collection("users").stream()

    return user_doc


@app.get("/add")
async def add():
    return {}


@app.get("/delete")
async def delete():
    return {}
