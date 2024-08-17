from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *

class FoodItemSerializer(ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['name','desc','price','topping','toppingprice','image']
        # exclude = ['answer','paidHint','keywords']
        
class BranchSerializer(ModelSerializer):
    class Meta:
        model = Branch
        fields = ['location','owner','contact']
                
class BranchMenuSerializer(ModelSerializer):
    class Meta:
        model = BranchMenu
        fields = ['location','foodname']