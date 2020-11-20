from rest_framework import viewsets
from orders.w2ui import W2UIGridView
from rest_framework.response import Response
from orders.models import Accounts
from orders.models import Orders
from orders.serializers import AccountSerializer, OrderSerializer, FormLookupFieldSerializer


# Create your views here.
class AccountViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Accounts.objects.all()
    serializer_class = AccountSerializer


# Create your views here.
class OrderViewSet(viewsets.ModelViewSet, W2UIGridView):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer


    def get_queryset(self):
        """
        Optionally restricts the queryset by filtering against
        query parameters in the URL.
        """
        queryset = Orders.objects.prefetch_related('account').all()

        return self.get_records(self.request.query_params, queryset)


class AccountLookupView(viewsets.ModelViewSet):
    queryset = Accounts.objects.all()
    serializer_class = AccountSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = FormLookupFieldSerializer(queryset, many=True)

        return Response({
            "items":serializer.data,
            "status":"success"
        })
