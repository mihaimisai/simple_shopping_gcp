from google.cloud import firestore
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

try:
    db = firestore.Client()
    logging.info("Connected to Firestore")
except Exception as e:
    logging.error(f"Error connecting to Firestore: {e}")