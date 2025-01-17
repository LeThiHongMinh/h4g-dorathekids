from django.urls import path
from . import views

urlpatterns = [
    path('vouchers/', views.get_user_vouchers, name='get_user_vouchers'), #get all vouchers
    path('vouchers/search/', views.get_vouchers_by_product, name='get_vouchers_by_product'), #query voucher
]
