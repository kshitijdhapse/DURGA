from django.db import models

# Create your models here.

class FoodItem(models.Model):
    name = models.CharField("Name", max_length=50)
    image = models.ImageField(blank=True,null=True, upload_to='images/')
    description = models.CharField("Description", max_length=200)
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
