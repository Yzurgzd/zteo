from rest_framework import serializers

from django.contrib.auth.password_validation import validate_password
from djoser.conf import settings
from django.core import exceptions as django_exceptions
from rest_framework.settings import api_settings
from django.db import IntegrityError, transaction

from .models import User, Address, Feedback


class UserSerializer(serializers.ModelSerializer):
    get_quantity_products_in_cart = serializers.IntegerField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email',
                  'avatar', 'get_quantity_products_in_cart')


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)
    first_name = serializers.CharField(
        style={"input_type": "first_name"}, write_only=True)
    last_name = serializers.CharField(
        style={"input_type": "first_name"}, write_only=True)

    default_error_messages = {
        "cannot_create_user": settings.CONSTANTS.messages.CANNOT_CREATE_USER_ERROR
    }

    class Meta:
        model = User
        fields = (
            settings.LOGIN_FIELD,
            settings.USER_ID_FIELD,
            "password",
            "first_name",
            "last_name"
        )

    def validate(self, attrs):
        user = User(**attrs)
        password = attrs.get("password")
        first_name = attrs.get("first_name")
        last_name = attrs.get("last_name")

        try:
            validate_password(password, user)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(
                {"password": serializer_error[api_settings.NON_FIELD_ERRORS_KEY]},
            )

        return attrs

    def create(self, validated_data):
        try:
            user = self.perform_create(validated_data)
        except IntegrityError:
            self.fail("cannot_create_user")

        return user

    def perform_create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            if settings.SEND_ACTIVATION_EMAIL:
                user.is_active = False
                user.save(update_fields=["is_active"])
        return user


class UserCreatePasswordRetypeSerializer(UserCreateSerializer):
    default_error_messages = {
        "password_mismatch": settings.CONSTANTS.messages.PASSWORD_MISMATCH_ERROR
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["re_password"] = serializers.CharField(
            style={"input_type": "password"}
        )

    def validate(self, attrs):
        self.fields.pop("re_password", None)
        re_password = attrs.pop("re_password")
        attrs = super().validate(attrs)
        if attrs["password"] == re_password:
            return attrs
        else:
            self.fail("password_mismatch")


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('id', 'region', 'town', 'apartment', 'postal', 'default')


class AddFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('id', 'subject', 'message')


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'avatar')
