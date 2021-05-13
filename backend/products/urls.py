from django.urls import path
from . import views


urlpatterns = [
    path('products/<slug>/', views.ProductsCategoryView.as_view()),
    path('product/<slug>/', views.ProductDetailView.as_view()),
    path('product/<slug>/review/', views.CreateReviewView.as_view()),
    path('categories/', views.CategoriesView.as_view()),
    path('categories/parent/', views.ParentCategoriesView.as_view()),
    path('category/<slug>/', views.СategoryView.as_view())
]
