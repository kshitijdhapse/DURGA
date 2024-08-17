from .serializers import *
from .models import *
from django.shortcuts import get_object_or_404

# DRF imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

class FoodDetail(APIView):
    def get(self,request,*args, **kwargs):
        categorical = {}
        
        Food = FoodItem.objects.filter(hide = False)
        for item in Food:
            if item.category not in categorical:
                categorical[item.category] = []
            categorical[item.category].append({
                'name': item.name,
                'desc': item.description,
                'price': str(item.price),
                'topping': item.topping,
                'topping_price': str(item.topping_price),
                'image': str(item.image),
            })
        return Response(categorical)


class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    
class BranchMenuAPI(APIView):
    def get(self,request,*args, **kwargs):
        categorical = {}
        branch = kwargs.get('branch')
        branch_instance = get_object_or_404(Branch, location=branch)
        Food = BranchMenu.objects.filter(location=branch_instance)
        for BranchItem in Food:
            item=BranchItem.foodname
            if item.category not in categorical:
                categorical[item.category] = []
            categorical[item.category].append({
                'name': item.name,
                'desc': item.description,
                'price': str(item.price),
                'topping': item.topping,
                'topping_price': str(item.topping_price),
                'image': str(item.image),
            })
        return Response(categorical)