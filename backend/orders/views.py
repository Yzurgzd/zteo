from rest_framework import generics, permissions

from django.core.exceptions import ObjectDoesNotExist

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from django.shortcuts import get_object_or_404
from django.http import Http404
from .models import Cart, Order, Coupon
from products.models import Product
from users.models import User, Address, Payment
from .service import StandardResultsSetPagination, OrderFilter
from .serializers import OrderSerializer, CartSerializer, CouponSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.utils import timezone
from django.conf import settings

import stripe


stripe.api_key = 'sk_test_51IXQQMG0kz5gTu2Ut8FMA3vhY2JSILExKpXvzg9YLp4P6PsBVv57Xrr9IdErdKJn26fGdjWEKADDpIlFckezR5V900zzq2ug8w'


class OrderView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return Order.objects.get(user=self.request.user, ordered=False)

    def retrieve(self, request, *args, **kwargs):
        try:
            order = self.get_serializer(self.get_object()).data
            return Response(order)
        except ObjectDoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)


class ListOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = OrderFilter
    search_fields = ('id',)

    def get_queryset(self):
        try:
            orders = Order.objects.filter(user=self.request.user, ordered=True)
            return orders
        except ObjectDoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)


class AddCouponView(generics.UpdateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

    def update(self, request, *args, **kwargs):
        code = request.data.get('code', None)

        if code is None or len(code.strip()) == 0:
            return Response({"detail": "Получены неверные данные"}, status=HTTP_400_BAD_REQUEST)

        try:
            order = Order.objects.get(
                user=self.request.user, ordered=False)
            try:
                coupon = Coupon.objects.get(code=code)
                if order.get_subtotal() >= coupon.initial_amount:
                    order.coupon = coupon
                    order.save()
                    return Response(status=HTTP_200_OK)
                else:
                    return Response({'detail': f'Ошибка при добавлении купона. Сумма применения купона составляет: {coupon.initial_amount}'}, status=HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                return Response({'detail': 'Этот купон не существует'}, status=HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'detail': 'У вас нет активного заказа'}, status=HTTP_400_BAD_REQUEST)


class RemoveCouponView(generics.UpdateAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer

    def update(self, request, *args, **kwargs):
        order = Order.objects.get(
            user=self.request.user, ordered=False)
        order.coupon = None
        order.save()
        return Response(status=HTTP_200_OK)


class AddToCartView(generics.CreateAPIView):
    queryset = Cart.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        quantity = request.data.get('quantity', None)
        if slug is None:
            return Response({"detail": "Неверные данные"}, status=HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, slug=slug)

        cart_qs = Cart.objects.filter(
            product=product,
            user=request.user,
            ordered=False
        )

        if cart_qs.exists():
            cart = cart_qs.first()
            cart.quantity += 1
            cart.save()
        else:
            cart = Cart.objects.create(
                product=product,
                user=request.user,
                ordered=False
            )
            cart.save()

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if not order.products.filter(product__id=cart.id).exists():
                order.products.add(cart)
            return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.products.add(cart)
            return Response(status=HTTP_200_OK)


class CartQuantityUpdateView(generics.UpdateAPIView):
    queryset = Cart.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        if slug is None:
            return Response({"detail": "Неверные данные"}, status=HTTP_400_BAD_REQUEST)
        product = get_object_or_404(Product, slug=slug)
        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order = order_qs[0]
            if order.products.filter(product__slug=product.slug).exists():
                cart = Cart.objects.filter(
                    product=product,
                    user=request.user,
                    ordered=False
                )[0]
                if cart.quantity > 1:
                    cart.quantity -= 1
                    cart.save()
                else:
                    order.products.remove(cart)
                    cart.delete()
                    if order.products.count() < 1:
                        order.delete()
                return Response(status=HTTP_200_OK)
            else:
                return Response({"detail": "Этого товара не было в вашей корзине"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "У вас нет активного заказа"}, status=HTTP_400_BAD_REQUEST)


class CartProductDeleteView(generics.DestroyAPIView):
    queryset = Cart.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        order_qs = Order.objects.filter(
            user=request.user,
            ordered=False
        )
        if order_qs.exists():
            order = order_qs[0]
            if order.products.filter(id=pk).exists():
                cart = Cart.objects.filter(
                    id=pk,
                    user=request.user,
                    ordered=False
                )[0]
                order.products.remove(cart)
                cart.delete()
                if order.products.count() < 1:
                    order.delete()
                return Response(status=HTTP_200_OK)
            else:
                return Response({"detail": "Этого товара не было в вашей корзине"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "У вас нет активного заказа"}, status=HTTP_400_BAD_REQUEST)


class PaymentView(generics.CreateAPIView):
    queryset = Payment.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        order = Order.objects.get(user=request.user, ordered=False)
        user = request.user
        token = request.data.get('stripeToken')
        address_id = request.data.get('address')
        if address_id == '' or address_id is None:
            return Response({"message": "Выберите адрес доставки"}, status=HTTP_400_BAD_REQUEST)

        address = Address.objects.get(id=address_id)

        if user.stripe_customer_id != '' and user.stripe_customer_id is not None:
            customer = stripe.Customer.retrieve(
                user.stripe_customer_id)
            customer.create_source(customer['id'], source=token)

        else:
            customer = stripe.Customer.create(
                email=request.user.email)
            customer.create_source(customer['id'], source=token)
        user.stripe_customer_id = customer['id']
        user.one_click_purchasing = True
        user.save()

        amount = int(order.get_total() * 100)

        try:

            # charge the customer because we cannot charge the token more than once
            charge = stripe.Charge.create(
                amount=amount,  # cents
                currency="rub",
                customer=user.stripe_customer_id
            )
            # charge once off on the token
            # charge = stripe.Charge.create(
            #     amount=amount,  # cents
            #     currency="usd",
            #     source=token
            # )

            # create the payment
            payment = Payment()
            payment.stripe_charge_id = charge['id']
            payment.user = request.user
            payment.amount = order.get_total()
            payment.save()

            # assign the payment to the order

            cart = order.products.all()
            cart.update(ordered=True)
            for product in cart:
                product.save()

            order.ordered = True
            order.payment = payment
            order.address = address
            # order.ref_code = create_ref_code()
            order.save()

            return Response(status=HTTP_200_OK)

        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            return Response({"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly

            # messages.warning(self.request, "Rate limit error")
            return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
            print(e)
            # Invalid parameters were supplied to Stripe's API
            return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response({"message": "Not authenticated"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe send
            # yourself an email
            return Response({"message": "Something went wrong. You were not charged. Please try again."}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # send an email to ourselves
            return Response({"message": "A serious error occurred. We have been notifed."}, status=HTTP_400_BAD_REQUEST)

        return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)
