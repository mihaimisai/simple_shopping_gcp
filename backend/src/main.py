from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .firebase_utils import db
from firebase_admin import auth
from fastapi import Header

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

# Dependency to verify the Firebase ID tokem
async def get_current_user(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        scheme, token = authorization.split(" ")
        if scheme.lower() != "bearer":
            raise HTTPException(
                status_code=401, detail="Invalid authentication scheme"
            )
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token['uid']
        return uid
    except Exception as e:
        raise HTTPException(
            status_code=401, detail=f"Invalid authentication credentials: {e}"
        )


@app.get("/healthcheck")
async def check():
    return {"status": 200}


@app.get("/retrievelist")
async def retrieve(user_id: str = Depends(get_current_user)):
    items = []
    items_ref = db.collection("users").document(user_id).collection("items")
    docs = items_ref.stream()
    for doc in docs:
        items.append(doc.to_dict())
    return items


@app.get("/add")
async def add():
    return {}


@app.get("/delete")
async def delete():
    return {}
