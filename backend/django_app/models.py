from django.db import models
from django.contrib.auth.models import User

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product_id = models.IntegerField()
    qty = models.IntegerField(default=1)

    class Meta:
        unique_together = ('user', 'product_id')