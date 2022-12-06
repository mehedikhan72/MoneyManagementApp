from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
import json
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import User, Finance, DailyExpenditure, Category
import calendar, datetime, pytz

# Create your views here.



@csrf_exempt
@login_required
def update_finance(request, finance_id):
    finance = Finance.objects.get(pk=finance_id)
    data = json.loads(request.body)
    finance.income = data.get("income", "")
    finance.income_cycle = data.get("income_period", "")
    finance.saving_goal = data.get("saving_goal", "")
    finance.balance = data.get("balance", "")
    finance.goal = data.get("saving_period", "")
    finance.save()
    return JsonResponse(finance.serialize())


@csrf_exempt
@login_required
def remove_expenditure(request, expenditure_id):
    expenditure = DailyExpenditure.objects.get(pk = expenditure_id)
    finance = Finance.objects.get(user = request.user)
    finance.total_expenditure -= int(expenditure.cost)
    finance.daily_expenditure -= int(expenditure.cost)
    finance.save()
    expenditure.delete()
    return JsonResponse(finance.serialize())



@login_required
def add_expenditure(request):
    if request.method ==   "POST":
        stuff = request.POST.get("stuff", None)
        cost = request.POST.get("cost", None)
        category = request.POST["category"]
        category = Category.objects.get(id=category)
        expenditure = DailyExpenditure(user=request.user, stuff=stuff, cost=cost, category=category)
        finance = Finance.objects.get(user = request.user)
        expenditure.save()
        finance.total_expenditure += int(cost)
        finance.daily_expenditure += int(cost)
        finance.save()
    return HttpResponseRedirect(reverse("index"))




@login_required
def add_record(request):
    income = request.POST.get("income", None)
    finance = Finance(user=request.user, income=income)
    cycle = request.POST.get("cycle", None)
    if cycle:
        finance.income_cycle = cycle
    balance = request.POST.get("balance", None)
    if balance:
        finance.balance = balance
    saving = request.POST.get("saving", None)
    if saving:
        finance.saving_goal = saving
    goal = request.POST.get("goal", None)
    if goal:
        finance.goal = goal
    estimate = request.POST.get("estimate", None)
    if estimate:
        finance.daily_cost_estimate = estimate
    finance.save()
    daily_income = float(finance.income) / float(finance.income_cycle)


    return HttpResponseRedirect(reverse("index"))

def index(request):
    finance = None
    daily_income = None
    expenditures = None
    
    if request.user.is_authenticated:
        current_date = datetime.datetime.now(pytz.timezone(request.user.time_zone)).date()
        if Finance.objects.filter(user = request.user):
            finance = Finance.objects.get(user=request.user)

            daily_income = finance.income / finance.income_cycle


            if DailyExpenditure.objects.filter(user = request.user):
                expenditures = DailyExpenditure.objects.filter(user=request.user, time=current_date)
                finance.daily_expenditure = 0
                for expenditure in expenditures:
                    finance.daily_expenditure += expenditure.cost
                    finance.save()
            else:
                finance.daily_expenditure = 0
                finance.save()

    return render(request, "basic/index.html",{
        "finance": finance,
        "daily_income" : daily_income,
        "categories" : Category.objects.all(),
        "expenditures" : expenditures,
    })


def demo_calc(request):
    return render(request, "basic/demo_calc.html")

def login_view(request):
    logout(request)
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "basic/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "basic/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    logout(request)
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST.get("password")
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "basic/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "basic/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "basic/register.html")