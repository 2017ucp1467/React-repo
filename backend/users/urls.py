from django.urls import path
from .views import MyTokenObtainPairView,getUserProfile,getUsers,registerUser

urlpatterns=[
    path('',getUsers,name='all-users'),
    path('register/',registerUser, name='register-user'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', getUserProfile, name='user-profile'),
]