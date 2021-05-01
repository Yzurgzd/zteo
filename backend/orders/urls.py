from django.urls import path

from . import views


urlpatterns = [
    path('cart/add/', views.AddToCartView.as_view()),
    path('order/', views.OrderView.as_view()),
    path('list-orders/', views.ListOrdersView.as_view()),
    path('coupon/add/', views.AddCouponView.as_view()),
    path('coupon/remove/', views.RemoveCouponView.as_view()),
    path('cart/update-quantity/', views.CartQuantityUpdateView.as_view()),
    path('cart/<pk>/delete/', views.CartProductDeleteView.as_view()),
    path('payment/', views.PaymentView.as_view()),
]
