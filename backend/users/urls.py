from django.urls import path

from . import views


urlpatterns = [
    path('user/address/', views.AddressView.as_view()),
    path('user/update/', views.UpdateUserView.as_view()),
    path('user/avatar/delete/', views.DeleteAvatarView.as_view()),
    path('user/address/add/', views.AddAddressView.as_view()),
    path('user/address/delete/<pk>/', views.DeleteAddressView.as_view()),
    path('user/address/set-default/<pk>/',
         views.SetDefaultAddressView.as_view()),
    path('user/feedback/add/', views.AddFeedbackView.as_view())
]
