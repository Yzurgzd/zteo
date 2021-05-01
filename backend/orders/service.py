from rest_framework.pagination import PageNumberPagination
import django_filters
from .models import Order
from rest_framework.response import Response
import math


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 1
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            # 'links': {
            #     'next': self.get_next_link(),
            #     'previous': self.get_previous_link()
            # },
            'count': self.page.paginator.count,
            'page_count': math.ceil(self.page.paginator.count / self.page_size),
            'results': data,
        })


class OrderFilter(django_filters.FilterSet):
    class Meta:
        model = Order
        fields = ['delivered', 'received']
