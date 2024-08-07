from django.urls import path
from .views import *

urlpatterns = [
    path('menu/', FoodDetail.as_view(), name = 'Menu'),
]