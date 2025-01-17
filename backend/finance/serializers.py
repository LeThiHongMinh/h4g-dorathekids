from rest_framework import serializers
from .models import Voucher

class VoucherSerializer(serializers.ModelSerializer):
    # Include related fields if needed
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Voucher
        fields = ['id', 'user', 'product_name', 'balance', 'created_at', 'updated_at']
