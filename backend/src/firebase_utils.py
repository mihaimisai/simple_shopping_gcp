import firebase_admin
from firebase_admin import credentials, firestore
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

db = None

try:
    # Check if the Firebase app is already initialized
    if not firebase_admin._apps:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred)
        logging.info("Firebase Admin SDK initialized successfully.")
    db = firestore.client()
    logging.info("Connected to Firestore")
except Exception as e:
    logging.error(f"Error connecting to Firestore or initializing Firebase Admin SDK: {e}")
