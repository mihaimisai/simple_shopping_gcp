import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json

# Load the service account key from the environment variable
service_account_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT_SIMPLE_SHOPPING_GCP")

if service_account_json:
    try:
        service_account_info = json.loads(service_account_json)
        cred = credentials.Certificate(service_account_info)
        app = firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Firebase Admin SDK initialized successfully from environment variable.")
    except (ValueError, KeyError, TypeError) as e:
        print(f"Error initializing Firebase from environment variable: {e}")
        # Handle the error appropriately, e.g., exit the application
else:
    print("FIREBASE_SERVICE_ACCOUNT_KEY environment variable not found.")
    # Handle the error appropriately
