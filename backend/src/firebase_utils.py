import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json

# Load the service account key from the environment variable
service_account_json = os.environ.get(
    "FIREBASE_SERVICE_ACCOUNT_SIMPLE_SHOPPING_GCP"
)  # noqa
db = None
if service_account_json:
    try:
        service_account_info = json.loads(service_account_json)
        cred = credentials.Certificate(service_account_info)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("Connected to Firestore")

    except (ValueError, KeyError, TypeError) as e:
        print(f"Error connecting to Firestore: {e}")
else:
    print("FIREBASE_SERVICE_ACCOUNT_KEY environment variable not found.")
