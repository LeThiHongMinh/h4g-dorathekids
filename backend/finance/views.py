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




