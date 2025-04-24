from fastapi import FastAPI, Depends, Request, HTTPException, status
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
    if not auth_header:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing auth header",  # noqa
        )

    try:
        token = auth_header.split(" ")[1]
        decoded_token = auth.verify_id_token(token)
        return decoded_token["uid"]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {e}",  # noqa
        )


@app.get("/healthcheck")
async def check():
    return {"status": 200}


@app.get("/retrievelist")
async def retrieve(current_user=Depends(get_current_user)):

    user_id = current_user
    print(user_id)

    user_doc = db.collection("users").stream()

    return user_doc


@app.get("/add")
async def add():
    return {}


@app.get("/delete")
async def delete():
    return {}
