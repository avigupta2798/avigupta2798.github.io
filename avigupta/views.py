from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.core.mail import EmailMultiAlternatives
from django.urls import reverse
from django.core.mail import send_mail, BadHeaderError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from Portfolio import settings
from avigupta.forms import ContactForm


# Create your views here.

def home(request): # the function will take request as input
    return render(request, 'index.html') # the function then renders an html page template called home.html
        
def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = "INQUIRY"
            from_email = settings.EMAIL_HOST_USER
            to_email = [form.cleaned_data['email']]
            body = {
                'name': form.cleaned_data['name'],
                'email': form.cleaned_data['email'],
                'desc': form.cleaned_data['desc'],
            }
            body = "\n".join(body.values())
            msg = EmailMultiAlternatives(subject, body, from_email, to_email)
            msg.send()
    form = ContactForm()
    return render(request, 'contact.html', {'form':form})

def about_view(request):
    return render(request, 'about.html')