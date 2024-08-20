from django.urls import path,include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', FoodItemViewSet)

urlpatterns = [
    path('menu/', FoodDetail.as_view(), name = 'Menu'),
    path('menu/<str:branch>/',BranchMenuAPI.as_view(),name='branch-menu'),
    path('othermenu/<str:branch>/',OtherBranchMenuAPI.as_view(),name='other-branch-menu'),
    path('api/', include(router.urls)),
    path('login/',LoginView.as_view(),name='login'),
    path('register/',RegisterView.as_view(),name='register'),
    path('addbranchitem/',AddToBranchMenu.as_view(),name='add'),
    path('updateprice/',UpdateBranchMenuPriceAPI.as_view(),name='update'),
]