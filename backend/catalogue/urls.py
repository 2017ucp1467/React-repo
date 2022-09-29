from django.urls import path
from .views import getProducts,getProduct,updateProduct,deleteProduct,createProduct,createProductReview
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('products/', getProducts, name='products'),
    path('products/<int:pk>/reviews/',createProductReview,name='product-review'),
    path('products/<int:pk>/', getProduct, name='products'),
    path('products/create/',createProduct, name='create-product'),
    path('products/update/<int:pk>/',updateProduct, name='update-product' ),
    path('products/delete/<int:pk>/',deleteProduct, name='delete-product'),
]