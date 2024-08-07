from .serializers import *
from .models import *

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
            categorical[item.category].append(item)
        return Response(categorical)
