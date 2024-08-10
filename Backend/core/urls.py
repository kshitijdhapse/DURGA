from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', FoodItemViewSet)

urlpatterns = [
    path('menu/', FoodDetail.as_view(), name = 'Menu'),
    path('api/', include(router.urls)),
]