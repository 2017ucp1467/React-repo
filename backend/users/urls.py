from django.urls import path
from .views import MyTokenObtainPairView,getUserProfile,getUsers

urlpatterns=[
    path('',getUsers,name='all-users'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', getUserProfile, name='user-profile'),
]