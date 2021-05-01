from rest_framework import serializers

from .models import Cart, Order, Coupon

from products.serializers import ProductDetailSerializer, ProductListSerializer, CategorySerializer
from users.serializers import AddressSerializer


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('id', 'code', 'initial_amount', 'discount_amount')


class CartSerializer(serializers.ModelSerializer):
    product = ProductListSerializer()

    get_total_product_price = serializers.DecimalField(
        max_digits=6, decimal_places=0)
    get_total_discount_product_price = serializers.DecimalField(
        max_digits=6, decimal_places=0)
    get_amount_saved = serializers.DecimalField(max_digits=6, decimal_places=0)
    get_final_price = serializers.DecimalField(max_digits=6, decimal_places=0)

    class Meta:
        model = Cart
        fields = ('id', 'ordered', 'product', 'quantity', 'get_total_product_price',
                  'get_total_discount_product_price', 'get_amount_saved', 'get_final_price')


class OrderSerializer(serializers.ModelSerializer):
    products = CartSerializer(many=True)
    coupon = CouponSerializer()
    address = AddressSerializer()

    get_subtotal = serializers.DecimalField(
        max_digits=6, decimal_places=0)
    get_total = serializers.DecimalField(
        max_digits=6, decimal_places=0)

    class Meta:
        model = Order
        fields = ('id', 'products', 'ordered_date', 'ordered',
                  'coupon', 'address', 'delivered', 'received', 'get_subtotal', 'get_total')
