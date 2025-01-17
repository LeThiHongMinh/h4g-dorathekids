from django.urls import path
from .views import RegisterView, LoginView, ResetPasswordView, Verify2FAView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('verify-2fa/', Verify2FAView.as_view(), name='verify_2fa'),
]
