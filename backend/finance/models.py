from django.db import models
from django.conf import settings  # For linking to the User model

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255)  # Product name
    description = models.TextField(blank=True, null=True)  # Optional product description
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Product price
    stock_quantity = models.PositiveIntegerField()  # Quantity in stock
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp when last updated

    def __str__(self):
        return self.name
    
class Voucher(models.Model):
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        related_name='vouchers'
    )  # Links to Product's id
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='vouchers'
    )  # Links to User's id
    balance = models.DecimalField(max_digits=10, decimal_places=2)  # Voucher balance
    created_at = models.DateTimeField(auto_now_add=True)  # Creation timestamp
    updated_at = models.DateTimeField(auto_now=True)  # Last updated timestamp

    def __str__(self):
        return f"Voucher for {self.user} - {self.product.name} (${self.balance})"
    