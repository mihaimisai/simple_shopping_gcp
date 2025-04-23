import firebase_admin
from firebase_admin import credentials, firestore
import os
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load the service account key from the environment variable
service_account_json = os.environ.get(
    "FIREBASE_SERVICE_ACCOUNT_SIMPLE_SHOPPING_GCP"
)  # noqa

if service_account_json:
    try:
        service_account_info = json.loads(service_account_json)
        cred = credentials.Certificate(service_account_info)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        logging.info("Connected to Firestore")

    except (ValueError, KeyError, TypeError) as e:
        logging.error(f"Error connecting to Firestore: {e}")
else:
    logging.error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable not found.")
