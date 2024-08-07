from django.db import models

# Create your models here.

class FoodItem(models.Model):
    name = models.CharField("Name", max_length=50)
    image = models.ImageField(blank=True,null=True, upload_to='images/')
    description = models.CharField("Description", max_length=200)
    price = models.DecimalField("Price", max_digits=10, decimal_places=2)
    category = models.CharField("Category", max_length=50)
    hide = models.BooleanField("Hide", default=False)
    topping = models.CharField("Topping", max_length=50, blank=True, null=True)
    topping_price = models.DecimalField("Topping Price", max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name
