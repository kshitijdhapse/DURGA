from .serializers import *
from .models import *
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import authenticate, login as django_login

# DRF imports
from rest_framework.permissions import AllowAny
from rest_framework import status
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
        # branch_instance = get_object_or_404(Branch, branch=branch)
        Food = BranchMenu.objects.filter(branch=branch)
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

class OtherBranchMenuAPI(APIView):
    def get(self,request,*args, **kwargs):
        categorical = {}
        branch = kwargs.get('branch')
        # branch_instance = get_object_or_404(Branch, branch=branch)
        Food = BranchMenu.objects.exclude(branch=branch)
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

class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            django_login(request, user)
            # Serialize the user object
            user_data = UserSerializer(user).data
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)
        
class RegisterView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access this view

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'detail': f'User {user.username} created successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AddToBranchMenu(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access

    def post(self,request,*args, **kwargs):
        branch = request.User.branch
        items = request.data.get('items',[])
        
        if not items :
            return Response({"detail":"No items selected."}, status = 400)
        for item_id in items:
            food_item = get_object_or_404(FoodItem, id=item_id)
            BranchMenu.objects.create(
                branch=branch,
                foodname=food_item,
                price=food_item.price  # Set initial price to the food item's price
            )
    
class UpdateBranchMenuPriceAPI(APIView):
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access

    def post(self, request, *args, **kwargs):
        branch_menu_id = kwargs.get('id')
        new_price = request.data.get('price')

        if new_price is None:
            return Response({"detail": "Price is required."}, status=400)

        branch_menu_item = get_object_or_404(BranchMenu, id=branch_menu_id, branch=request.user.branch)
        branch_menu_item.price = new_price
        branch_menu_item.save()

        return Response({"detail": "Price updated successfully!"}, status=200)

