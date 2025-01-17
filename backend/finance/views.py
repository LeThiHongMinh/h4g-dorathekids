from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Voucher
from .serializers import VoucherSerializer

# Create your views here.

#Fetch all of user's vouchers.
@api_view(['GET'])
def get_user_vouchers(request):
    user = request.user  # Get the logged-in user
    vouchers = user.vouchers.select_related('product')  # Fetch related data efficiently

    # Serialize the vouchers
    serializer = VoucherSerializer(vouchers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_vouchers_by_product(request):
    user = request.user
    product_name = request.query_params.get('product_name')  # Get product name from query parameters
    user = request.user

    if not product_name:
        return Response({'error': 'Product name is required'}, status=400)

    # Filter vouchers by product name for the logged-in user
    vouchers = Voucher.objects.filter(user=user, product__name__icontains=product_name)
    serializer = VoucherSerializer(vouchers, many=True)
    return Response(serializer.data)


