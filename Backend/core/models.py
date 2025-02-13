from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser

class Branch(models.Model):
    branch = models.CharField("Branch", max_length=50)
    owner = models.CharField(max_length=50, null=True, blank=True)
    contact = models.CharField(
        max_length=10,
        validators=[RegexValidator(r'^\d{10}$', 'Enter a valid 10-digit contact number')],
        null=True, blank=True
    )

    def __str__(self):
        return self.branch

class User(AbstractUser):
    branch = models.ForeignKey(Branch, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.username

class FoodCategory(models.Model):
    categoryname = models.CharField("CategoryName", max_length=50)

    def __str__(self):
        return self.categoryname if self.categoryname else "Uncategorized"

class FoodItem(models.Model):
    name = models.CharField("Name", max_length=50)
    image = models.ImageField(blank=True, null=True, upload_to='images/')
    description = models.CharField("Description", max_length=200, null=True)
    price = models.DecimalField("Price", max_digits=10, decimal_places=2)
    category = models.ForeignKey(FoodCategory, null=True, blank=True, on_delete=models.SET_NULL)
    hide = models.BooleanField("Hide", default=False)
    topping = models.CharField("Topping", max_length=50, blank=True, null=True)
    topping_price = models.DecimalField("Topping Price", max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name

class BranchMenu(models.Model):
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    foodname = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    price = models.DecimalField("Price", max_digits=10, decimal_places=2, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Ensure that `foodname` exists before using it
        if not self.price and self.foodname:
            self.price = self.foodname.price
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.foodname} at {self.branch}"
