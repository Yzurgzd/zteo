from rest_framework import generics, permissions
from .models import Product, Category, Review, SpecificationValue, ProductSpecificationValue, Specification
from .serializers import ProductListSerializer, ProductDetailSerializer, CreateReviewSerializer, CategorySerializer, CategoryDetailSerializer, SpecificationSerializer, SpecificationValueSerializer
from .service import StandardResultsSetPagination, ProductFilter
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.db.models import Max, Min
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(hide=False)
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'


class ProductsCategoryView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_class = ProductFilter
    search_fields = ('name',)

    def get_queryset(self):
        return Product.objects.filter(hide=False, category__slug=self.kwargs.get('slug'))

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(self.filter_queryset(queryset))
        product = self.get_serializer(page, many=True).data

        category = CategorySerializer(
            Category.objects.get(slug=self.kwargs.get('slug'))).data

        price_range = queryset.aggregate(Min('price'), Max('price'))

        specifications = SpecificationSerializer(
            Specification.objects.filter(category__slug=self.kwargs.get('slug')), many=True).data

        return self.get_paginated_response({'products': product, 'category': category,
                                            'filters': {'price_range': price_range, 'specifications': specifications}})


class CategoriesView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailSerializer
    pagination_class = None


class ParentCategoriesView(generics.ListAPIView):
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer
    pagination_class = None


class СategoryView(generics.ListAPIView):
    serializer_class = CategoryDetailSerializer
    pagination_class = None

    def get_queryset(self):
        return Category.objects.filter(parent__slug=self.kwargs.get('slug'))

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        categories = self.get_serializer(queryset, many=True).data
        category = CategorySerializer(
            Category.objects.get(slug=self.kwargs.get('slug'))).data
        return Response({'category': category, 'categories': categories})


class CreateReviewView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = CreateReviewSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            comment = request.data.get('comment')
            rating = request.data.get('rating')
            product = Product.objects.get(slug=self.kwargs.get('slug'))

            review = Review.objects.create(
                user=request.user,
                comment=comment,
                rating=rating,
                product=product
            )
            return Response(status=HTTP_200_OK)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
