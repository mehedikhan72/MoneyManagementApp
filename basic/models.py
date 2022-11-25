from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class Finance(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    income = models.DecimalField(max_digits=8, decimal_places=2)
    income_cycle = models.IntegerField(default=30)
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    saving_goal = models.DecimalField(max_digits=8, decimal_places = 2, default=0)
    goal = models.IntegerField(default=30)
    daily_cost_estimate = models.DecimalField(max_digits = 6, decimal_places=2, default=0)
    total_expenditure = models.DecimalField(max_digits = 8, decimal_places=2, default=0)
    add_money = models.DecimalField(max_digits = 8, decimal_places = 2, default = 0)
    
    def __str__(self):
        return f"{self.income} {self.balance} {self.goal} {self.total_expenditure}"


class Category(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.name}"



class DailyExpenditure(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stuff = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, default= "none")
    total_spending = models.DecimalField(max_digits=8, decimal_places=2)

