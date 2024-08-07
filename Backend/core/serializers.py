from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class FoodItemSerializer(ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['name','desc','price','topping','toppingprice','image']
        # exclude = ['answer','paidHint','keywords']