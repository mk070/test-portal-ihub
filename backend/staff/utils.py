# utils/mongo.py
import os
import pymongo
from dotenv import load_dotenv
from pymongo.errors import ConfigurationError, ServerSelectionTimeoutError
import jwt
from pymongo import MongoClient
from datetime import datetime, timedelta

load_dotenv()

class MongoDBConnection:
    _instance = None

    @classmethod
    def get_connection(cls):
        if cls._instance is None:
            try:
                client = pymongo.MongoClient(os.getenv("MONGO_URI"), serverSelectionTimeoutMS=5000)
                client.admin.command("ping")  # Check connection
                cls._instance = client["test_portal_db"]
            except (ConfigurationError, ServerSelectionTimeoutError) as e:
                raise Exception(f"Database connection error: {e}")
        return cls._instance

    @classmethod
    def get_collection(cls, collection_name):
        return cls.get_connection()[collection_name]

# Collections
staff_collection = MongoDBConnection.get_collection("staff")
student_collection = MongoDBConnection.get_collection("student")

# Initialize MongoDB client
client = MongoClient(os.getenv('MONGODB_URI'))
db = client.get_database('your_database_name')  # Replace with your database name
staff_collection = db.get_collection('staff')  # Replace with your collection name

def generate_jwt_tokens(user_id):
    """
    Generate JWT access and refresh tokens for a user.
    """
    secret_key = os.getenv('JWT_SECRET_KEY', 'your_default_secret_key')  # Use environment variable
    algorithm = 'HS256'
    access_token_expiry = datetime.utcnow() + timedelta(hours=1)  # 1 hour expiry
    refresh_token_expiry = datetime.utcnow() + timedelta(days=7)  # 7 days expiry

    access_token = jwt.encode(
        {'user_id': user_id, 'exp': access_token_expiry},
        secret_key,
        algorithm=algorithm
    )

    refresh_token = jwt.encode(
        {'user_id': user_id, 'exp': refresh_token_expiry},
        secret_key,
        algorithm=algorithm
    )

    return {
        'access_token': access_token,
        'refresh_token': refresh_token
    }

def get_staff_user_by_email(email):
    """
    Retrieve a staff user from the database by email.
    """
    return staff_collection.find_one({'email': email})

def insert_staff_user(staff_user):
    """
    Insert a new staff user into the database.
    """
    staff_collection.insert_one(staff_user)
