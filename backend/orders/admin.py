from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Order, Cart, Coupon
from .resources import OrderResource


@admin.register(Order)
class OrderAdmin(ImportExportModelAdmin):
    resource_class = OrderResource
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
