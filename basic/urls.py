from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("register", views.register, name="register"),
    path("login", views.login_view, name="login"),
    path("logout" , views.logout_view, name="logout"),
    path("add_record", views.add_record, name="add_record"),
    path("demo_calc", views.demo_calc, name="demo_calc"),
    path("add_expenditure", views.add_expenditure, name="add_expenditure"),
    path("remove_expenditure/<int:expenditure_id>", views.remove_expenditure, name="remove_expenditure"),
]