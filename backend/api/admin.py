from django.contrib import admin

# Register your models here.
from .models import OTP

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'created_at', 'expires_at')
    search_fields = ('user__username', 'code')
