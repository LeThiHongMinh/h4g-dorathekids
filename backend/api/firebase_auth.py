# /backend/pr/firebase_auth.py

import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials

# Initialize Firebase SDK
cred = credentials.Certificate("api/h4g-dorathekids.json")
firebase_admin.initialize_app(cred)

def verify_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except:
        return None
