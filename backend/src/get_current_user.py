from fastapi import Request, HTTPException, status
from firebase_admin import auth
from .firebase_utils import logging


async def get_current_user(request: Request):

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
        user_id = decoded_token["uid"]
        return user_id

    except Exception as e:
        logging.error(f"Token verification failed: {str(e)}")
        raise HTTPException(
            status_code=401,
            detail=f"Token verification failed: {str(e)}",
        )
