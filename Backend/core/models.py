from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser
# Create your models here.
# class User(AbstractUser):
#     branch = models.CharField(max_length=50)
    
class FoodItem(models.Model):
    name = models.CharField("Name", max_length=50)
    image = models.ImageField(blank=True,null=True, upload_to='images/')
    description = models.CharField("Description", max_length=200,null=True)
    price = models.DecimalField("Price", max_digits=10, decimal_places=2)
    
    foodchoices=(
        ('Breakfast','Breakfast'),
        ('Sandwich','Sandwich'),
        ('Misal Pav','Misal Pav'),
        ('Dosa','Dosa'),
        ('Pav Bhaji','Pav Bhaji'),
        ('Bhurji','Bhurji'),
        ('Cold Coffee','Cold Coffee'),
        ('Shakes','Shakes'),
        ('Pizza','Pizza'),
        ('Cold Drink','Cold Drink'),
        ('Ice Cream','Ice Cream'),
        ('Mastani','Mastani'),
        )
    category = models.CharField("Category",choices=foodchoices, max_length=50)
    hide = models.BooleanField("Hide", default=False)
    topping = models.CharField("Topping", max_length=50, blank=True, null=True)
    topping_price = models.DecimalField("Topping Price", max_digits=10, decimal_places=2, blank=True, null=True)
    
    def __str__(self):
        return self.name
    
class Branch(models.Model):
    location = models.CharField("Location",max_length=50)
    owner = models.CharField(max_length=50,null=True)
    contact = models.CharField(
        max_length=10,
        validators=[RegexValidator(r'^\d{10}$', 'Enter a valid 10-digit contact number')],
        null=True
    )
    def __str__(self):
        return self.location
    
class BranchMenu(models.Model):
    location = models.ForeignKey(Branch,on_delete=models.CASCADE)
    foodname = models.ForeignKey(FoodItem,on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.foodname} at {self.location}"
