from django.urls import path
from . import views

urlpatterns = [
    path('vouchers/', views.get_user_vouchers, name='get_user_vouchers'),
]
