from django.contrib import admin
from .models import Voucher, Product

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'stock_quantity', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'description')
# admin.site.register(Product)
@admin.register(Voucher)
class VoucherAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'balance', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at', 'product')
    search_fields = ('user__username', 'product__name')
