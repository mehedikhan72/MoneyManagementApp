from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from .models import User, Finance, DailyExpenditure, Category

# Create your views here.




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
    if request.user.is_authenticated:
        print("no")
        if Finance.objects.filter(user = request.user):
            finance = Finance.objects.get(user=request.user)

            print("yes")
    print(finance)
    return render(request, "basic/index.html",{
        "finance": finance
    })

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