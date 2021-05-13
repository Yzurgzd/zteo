from import_export import resources
from .models import Product


class ProductResource(resources.ModelResource):
    class Meta:
        model = Product
        fields = ('article', 'name', 'description', 'category',
                  'price', 'discount_price', 'hide', 'slug')
