from django.contrib import admin
from .models import Category, User, Finance, DailyExpenditure

# Register your models here.
admin.site.register(User)
admin.site.register(Finance)
admin.site.register(Category)
admin.site.register(DailyExpenditure)