from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

# Define CustomUser model before usage in OTP
class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    two_factor_enabled = models.BooleanField(default=False)

    def __str__(self):
        return self.username

# Now we can safely use get_user_model to reference CustomUser
from django.contrib.auth import get_user_model

User = get_user_model()

class OTP(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_valid(self):
        return timezone.now() < self.expires_at
