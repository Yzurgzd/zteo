from rest_framework.pagination import PageNumberPagination
import django_filters
from django_filters.filters import RangeFilter, ModelMultipleChoiceFilter
from .models import Product, SpecificationValue
from rest_framework.response import Response
import math
from django_filters.fields import Lookup


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


class CustomFilterList(django_filters.Filter):
    def filter(self, qs, value):
        if value not in (None, ''):
            values = [v for v in value.split(',')]
            for val in values:
                return qs.filter(**{'%s__%s' % (self.field_name, self.lookup_expr): val})
        return qs


class ProductFilter(django_filters.FilterSet):
    price = RangeFilter()
    specification = CustomFilterList(
        label='Характеристика', help_text='Несколько значений могут быть разделены запятыми.', field_name='productspecificationvalue', lookup_expr='specification_value')

    class Meta:
        model = Product
        fields = ['price', 'specification']
