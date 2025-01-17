from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    ResetPasswordSerializer,
    Verify2FASerializer,
    Enable2FASerializer,
)
from .utils import send_email, send_sms, generate_otp
from .firebase_auth import verify_token
from .models import OTP
from .utils import generate_otp, otp_expiry

User = get_user_model()

from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the homepage!")


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                if user.two_factor_enabled:
                    otp = generate_otp()
                    OTP.objects.update_or_create(
                        user=user,
                        defaults={"code": otp, "expires_at": otp_expiry()}
                    )
                    send_sms(user.phone_number, f"Your OTP is {otp}")
                    return Response({"message": "OTP sent"}, status=status.HTTP_200_OK)
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                })
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Verify2FAView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = Verify2FASerializer(data=request.data)
        if serializer.is_valid():
            otp_code = serializer.validated_data['otp']
            user = request.user
            otp_record = OTP.objects.filter(user=user, code=otp_code).first()
            
            if otp_record and otp_record.is_valid():
                otp_record.delete()  # Delete OTP after successful validation
                refresh = RefreshToken.for_user(user)
                return Response({
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                })
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            if user:
                token = generate_otp()
                OTP.objects.update_or_create(
                    user=user,
                    defaults={"code": token, "expires_at": otp_expiry()}
                )
                send_email(email, "Password Reset", f"Your reset token is {token}")
                return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)
            return Response({"error": "Email not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

