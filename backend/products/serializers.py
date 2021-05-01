from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField
from .models import Product, Review, Category, ProductImage, SpecificationValue, ProductSpecificationValue, Specification
from django.db.models import Avg, Q

from users.serializers import UserSerializer


class ParentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'poster', 'parent', 'slug')


class CategorySerializer(serializers.ModelSerializer):
    parent = ParentCategorySerializer()
    get_children = serializers.ListField(child=RecursiveField())

    class Meta:
        model = Category
        fields = ('id', 'name', 'parent', 'slug', 'get_children')


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Review
        fields = ('id', 'user', 'comment', 'date_added', 'rating')


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'comment', 'date_added', 'rating')


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')


class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    get_review_count = serializers.IntegerField()
    get_avg_rating = serializers.FloatField()

    class Meta:
        model = Product
        exclude = ('hide',)


class CategoryDetailSerializer(serializers.ModelSerializer):
    get_products = ProductListSerializer(many=True)
    get_children = serializers.ListField(child=RecursiveField())
    get_min_price = serializers.IntegerField()
    parent = ParentCategorySerializer()

    class Meta:
        model = Category
        fields = ('id', 'name', 'poster', 'parent', 'slug',
                  'get_products', 'get_children', 'get_min_price')


class ProductDetailSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)
    get_reviews = ReviewSerializer(many=True)
    get_review_count = serializers.IntegerField()
    get_avg_rating = serializers.FloatField()
    get_recommend = serializers.IntegerField()
    get_images = ProductImageSerializer(many=True)
    get_last_products = ProductListSerializer(many=True)

    class Meta:
        model = Product
        exclude = ('hide',)


class SpecificationValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecificationValue
        fields = ('id', 'value')


class SpecificationSerializer(serializers.ModelSerializer):
    get_specification_value = SpecificationValueSerializer(many=True)

    class Meta:
        model = Specification
        fields = ('id', 'name', 'get_specification_value')
