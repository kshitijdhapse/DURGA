from django.contrib import admin
from .models import FoodItem
from .models import Branch
from .models import BranchMenu

# Register your models here.



admin.site.register(FoodItem)
admin.site.register(Branch)
admin.site.register(BranchMenu)