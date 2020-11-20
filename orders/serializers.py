from rest_framework import serializers
from orders.models import Accounts, Orders
from django.core.serializers.json import Serializer

class OrderSerializer(serializers.ModelSerializer):
    account_id = serializers.CharField(source='account.id', read_only=True)
    account_name = serializers.CharField(source='account.name', read_only=True)

    class Meta:
        model = Orders
        fields = ('id', 'number', 'order_date', 'price', 'account', 'text', 'account_id', 'account_name')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accounts
        fields = ('id', 'name')

class FormLookupFieldSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    text = serializers.CharField(source='name',read_only=True)

    class Meta:
        fields = ('id', 'text')
