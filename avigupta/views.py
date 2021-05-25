from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.urls import reverse
from django.core.mail import send_mail, BadHeaderError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from Portfolio import settings
#from member.models import Member
#from member.forms import UserForm, RegistrationForm, LoginForm, ContactForm

# Create your views here.

def home(request): # the function will take request as input
    return render(request, 'index.html') # the function then renders an html page template called home.html