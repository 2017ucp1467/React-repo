from django.urls import path
from .views import addOrderItems,getMyOrders,getOrderById,updateOrderToPaid

urlpatterns = [
    path('add/', addOrderItems, name='placeOrder'),
    path('myorders/',getMyOrders, name='myOrders'),
    path('<int:pk>/',getOrderById, name='order-detail'),
    path('<int:pk>/pay/',updateOrderToPaid, name='pay order')
]