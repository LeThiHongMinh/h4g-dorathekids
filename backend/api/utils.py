import random
from django.core.mail import send_mail
from datetime import timedelta
from django.utils import timezone

# Generate OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# Set OTP Expiry
def otp_expiry():
    return timezone.now() + timedelta(minutes=5)  

# Send Email
def send_email(to_email, subject, message):
    try:
        send_mail(subject, message, 'your-email@gmail.com', [to_email])
        print(f"Email sent successfully to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")

# Send SMS using Firebase
def send_sms(phone_number, otp):
    try:
        auth.create_user(phone_number=phone_number)  
        link = auth.generate_sign_in_with_email_link(phone_number)
        print(f"OTP sent to {phone_number}: {otp}")
        return True
    except Exception as e:
        print(f"Failed to send SMS: {e}")
        return False
