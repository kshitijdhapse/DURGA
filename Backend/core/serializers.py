from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import *
class UserSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'password',
            'branch',
        ]

    def create(self,data):
        user = User.objects.create(
            username = data['username'],
            branch = data['branch'],
        )
        user.set_password(data['password'])
        user.save()
        return user
    
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
        fields = ['location','foodname','price']
        read_only_fields = ['location','foodname']