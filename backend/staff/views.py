from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password, make_password
from bson import ObjectId
from datetime import datetime, timedelta
import logging
import os
from .utils import generate_jwt_tokens, get_staff_user_by_email, insert_staff_user

logger = logging.getLogger(__name__)

@api_view(["POST"])
@permission_classes([AllowAny])  # Allow unauthenticated access for login
def staff_login(request):
    """
    Login view for staff
    """
    try:
        data = request.data
        email = data.get("email")
        password = data.get("password")

        # Validate input
        if not email or not password:
            return Response({"error": "Email and password are required"}, status=400)

        # Fetch staff user from MongoDB
        staff_user = get_staff_user_by_email(email)
        if not staff_user:
            return Response({"error": "Invalid email or password"}, status=401)

        # Check password
        stored_password = staff_user["password"]
        if check_password(password, stored_password):
            # Generate tokens
            tokens = generate_jwt_tokens(str(staff_user["_id"]))

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
                secure=os.getenv('SECURE_COOKIE', 'False') == 'True',  # Use environment variable
                max_age=1 * 24 * 60 * 60  # 1 day in seconds
            )
            return response

        return Response({"error": "Invalid email or password"}, status=401)
    
    except Exception as e:
        logger.error(f"Error during staff login: {e}")
        return Response({"error": "Something went wrong. Please try again later."}, status=500)


@api_view(["POST"])
@permission_classes([AllowAny])  # Allow signup without authentication
def staff_signup(request):
    """
    Signup view for staff
    """
    try:
        # Extract data from request
        data = request.data
        staff_user = {
            "email": data.get("email"),
            "password": make_password(data.get("password")),
            "full_name": data.get("fullName"),
            "position": data.get("position"),
            "department": data.get("department"),
            "phone": data.get("phone"),
            "address": {
                "street": data.get("street"),
                "city": data.get("city"),
                "state": data.get("state"),
                "zip": data.get("zip"),
            },
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
        }

        # Validate required fields
        required_fields = ["email", "password", "fullName", "position", "department"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        if missing_fields:
            return Response(
                {"error": f"Missing required fields: {', '.join(missing_fields)}"},
                status=400,
            )

        # Check if email already exists
        if get_staff_user_by_email(staff_user["email"]):
            return Response({"error": "Email already exists"}, status=400)

        # Insert staff profile into MongoDB
        insert_staff_user(staff_user)
        return Response({"message": "Signup successful"}, status=201)

    except Exception as e:
        logger.error(f"Error during staff signup: {e}")
        return Response(
            {"error": "Something went wrong. Please try again later."}, status=500
        )
