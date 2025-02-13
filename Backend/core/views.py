from .serializers import *
from .models import *
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework import permissions, status, generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# ✅ FoodDetail API (Returns menu categorized by FoodCategory)
class FoodDetail(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        categorical = {}

        Food = FoodItem.objects.filter(hide=False)
        for item in Food:
            category_name = str(item.category.categoryname) if item.category else "Uncategorized"

            if category_name not in categorical:
                categorical[category_name] = []

            categorical[category_name].append({
                'name': item.name,
                'desc': item.description,
                'price': str(item.price),
                'topping': item.topping,
                'topping_price': str(item.topping_price),
                'image': str(item.image),
            })
        return Response(categorical)

# ✅ ViewSet for Food Items
class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer

# ✅ Branch Menu API (Returns branch-specific menu categorized by FoodCategory)
class BranchMenuAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        categorical = {}
        branch = kwargs.get('branch')

        branch_instance = get_object_or_404(Branch, branch=branch)
        Food = BranchMenu.objects.filter(branch=branch_instance)

        for BranchItem in Food:
            item = BranchItem.foodname
            category_name = str(item.category.categoryname) if item.category else "Uncategorized"

            if category_name not in categorical:
                categorical[category_name] = []

            categorical[category_name].append({
                'name': item.name,
                'desc': item.description,
                'price': str(BranchItem.price),  # Use branch-specific price
                'topping': item.topping,
                'topping_price': str(item.topping_price),
                'image': str(item.image),
            })
        return Response(categorical)

# ✅ Get List of All Branches
class BranchSelectAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        Branches = Branch.objects.all()
        serialized = BranchSerializer(Branches, many=True)
        return Response(serialized.data)

# ✅ OtherBranchMenuAPI (Returns menu items not added in the selected branch)
class OtherBranchMenuAPI(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        categorical = {}
        branch = kwargs.get('branch')

        branch_instance = get_object_or_404(Branch, branch=branch)
        FoodInBranch = set(BranchMenu.objects.filter(branch=branch_instance).values_list('foodname', flat=True))
        AllFood = FoodItem.objects.filter(hide=False).exclude(id__in=FoodInBranch)

        for item in AllFood:
            category_name = str(item.category.categoryname) if item.category else "Uncategorized"

            if category_name not in categorical:
                categorical[category_name] = []

            categorical[category_name].append({
                'name': item.name,
                'desc': item.description,
                'price': str(item.price),
                'topping': item.topping,
                'topping_price': str(item.topping_price),
                'image': str(item.image),
            })
        return Response(categorical)

# ✅ Login API (JWT Authentication)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'detail': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            tokens = get_tokens_for_user(user)
            user_data = UserSerializer(user).data
            user_data.update(tokens)
            return Response(user_data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

# ✅ User Registration API
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

# ✅ Add Food Items to Branch Menu
class AddToBranchMenu(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        branch = request.user.branch
        items = request.data.get('items', [])

        if not items:
            return Response({"detail": "No items selected."}, status=400)

        for item_name in items:
            food_item = get_object_or_404(FoodItem, name=item_name)
            BranchMenu.objects.create(
                branch=branch,
                foodname=food_item,
                price=food_item.price
            )
        return Response({"detail": "Items added successfully!"}, status=200)

# ✅ Update Branch Menu Item Price
class UpdateBranchMenuPriceAPI(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        branch_menu_id = kwargs.get('id')
        new_price = request.data.get('price')

        if new_price is None:
            return Response({"detail": "Price is required."}, status=400)

        branch_menu_item = get_object_or_404(BranchMenu, id=branch_menu_id, branch=request.user.branch)
        branch_menu_item.price = new_price
        branch_menu_item.save()

        return Response({"detail": "Price updated successfully!"}, status=200)
