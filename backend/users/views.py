from rest_framework import generics, permissions

from django.core.exceptions import ObjectDoesNotExist

from .models import Address, User, Feedback
from .serializers import AddressSerializer, UserSerializer, UpdateUserSerializer, AddFeedbackSerializer
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class AddressView(generics.ListAPIView):
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = None

    def get_queryset(self):
        return Address.objects.filter(user=self.request.user).order_by('date_added')

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            address = self.get_serializer(queryset, many=True).data
            try:
                default_id = Address.objects.only('id').get(
                    user=request.user, default=True).id
            except ObjectDoesNotExist:
                default_id = None

            return Response({'address': address, 'default_id': default_id})
        except ObjectDoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)


class AddAddressView(generics.CreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            region = request.data.get('region')
            town = request.data.get('town')
            apartment = request.data.get('apartment')
            postal = request.data.get('postal')
            default = request.data.get('default')

            address = Address.objects.create(
                user=request.user,
                region=region,
                town=town,
                apartment=apartment,
                postal=postal,
            )

            if default:
                for other_address in Address.objects.filter(user=request.user):
                    other_address.default = False
                    other_address.save()
                address.default = True
                address.save()
            return Response(status=HTTP_200_OK)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SetDefaultAddressView(generics.UpdateAPIView):
    queryset = Address.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        address = Address.objects.get(id=pk, user=request.user)

        for other_address in Address.objects.filter(user=request.user):
            other_address.default = False
            other_address.save()
        address.default = True
        address.save()
        return Response(status=HTTP_200_OK)


class DeleteAddressView(generics.DestroyAPIView):
    queryset = Address.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def destroy(self, request, *args, **kwargs):
        pk = kwargs.get('pk')
        address = Address.objects.get(id=pk, user=request.user)
        address.delete()
        return Response(status=HTTP_200_OK)


class UpdateUserView(generics.UpdateAPIView):
    serializer_class = UpdateUserSerializer

    def get_object(self):
        return self.request.user


class DeleteAvatarView(generics.UpdateAPIView):
    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        user.avatar = 'users/avatar/default.jpg'
        user.save()
        return Response(status=HTTP_200_OK)


class AddFeedbackView(generics.CreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = AddFeedbackSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            subject = request.data.get('subject')
            message = request.data.get('message')

            feedback = Feedback.objects.create(
                user=request.user,
                subject=subject,
                message=message
            )
            return Response(status=HTTP_200_OK)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
