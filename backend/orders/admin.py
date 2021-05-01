from django.contrib import admin

from .models import Order, Cart, Coupon


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'ordered',
        'received',
        'address',
        'payment',
        'coupon',
        'ordered_date'
    )
    list_filter = (
        'ordered',
        'received',
    )
    search_fields = (
        'user__email',
    )


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'product',
        'quantity',
        'ordered'
    )


admin.site.register(Coupon)
