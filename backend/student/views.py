from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password, make_password
from bson import ObjectId
from datetime import datetime
import logging
from .utils import *

logger = logging.getLogger(__name__)


def generate_tokens_for_user(user_id):
    """
    Generate tokens for authentication. Modify this with JWT implementation if needed.
    """
    return {
        "access_token": f"access-{user_id}",
        "refresh_token": f"refresh-{user_id}"
    }

@api_view(["POST"])
@permission_classes([AllowAny])  # Allow unauthenticated access for login
def student_login(request):
    """
    Login view for students
    """
    try:
        data = request.data
        email = data.get("email")
        password = data.get("password")

        # Validate input
        if not email or not password:
            return Response({"error": "Email and password are required"}, status=400)

        # Fetch student user from MongoDB
        student_user = student_collection.find_one({"email": email})
        if not student_user:
            return Response({"error": "Invalid email or password"}, status=401)

        # Check password
        stored_password = student_user["password"]
        if check_password(password, stored_password):
            # Generate tokens
            tokens = generate_tokens_for_user(str(student_user["_id"]))

            # Create response and set secure cookie
            response = Response({
                "message": "Login successful",
                "tokens": tokens
            })
            response.set_cookie(
                key="jwt",
                value=tokens["access_token"],
                httponly=True,
                samesite="Lax",
                secure=False,  # Set to True if using HTTPS in production
                max_age=1 * 24 * 60 * 60  # 1 day in seconds
            )
            return response

        return Response({"error": "Invalid email or password"}, status=401)
    
    except Exception as e:
        logger.error(f"Error during student login: {e}")
        return Response({"error": "Something went wrong. Please try again later."}, status=500)


@api_view(["POST"])
@permission_classes([AllowAny])  # Allow signup without authentication
def student_signup(request):
    """
    Signup view for students
    """
    try:
        # Extract data from request
        data = request.data
        student_user = {
            "name": data.get("name"),
            "email": data.get("email"),
            "password": make_password(data.get("password")),
            "collegename": data.get("collegename"),
            "dept": data.get("dept"),
            "regno": data.get("regno"),
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
        }

        # Validate required fields
        required_fields = ["name", "email", "password", "dept", "collegename", "regno"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return Response(
                {"error": f"Missing required fields: {', '.join(missing_fields)}"},
                status=400,
            )

        # Check if email already exists
        if student_collection.find_one({"email": student_user["email"]}):
            return Response({"error": "Email already exists"}, status=400)

        # Insert student profile into MongoDB
        student_collection.insert_one(student_user)
        return Response({"message": "Signup successful"}, status=201)

    except Exception as e:
        logger.error(f"Error during student signup: {e}")
        return Response(
            {"error": "Something went wrong. Please try again later."}, status=500
        )
