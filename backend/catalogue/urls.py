from django.urls import path
from .views import getProducts,getProduct
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('products/', getProducts, name='products'),
    path('products/<str:pk>/', getProduct, name='products'),
]