from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://simple-shopping-gcp.web.app", #Live 1
    "https://simple-shopping-gcp.firebaseapp.com", #Live 2
    "https://simple-shopping-gcp--dev-w2v6xn68.web.app", #Dev 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello, World!"}