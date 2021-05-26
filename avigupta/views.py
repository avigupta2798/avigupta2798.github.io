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


    def send_mail(self,file_name, kwargs, sum_expected_revenue, to_email):
        subject = "LOOP: Revenue Sheet Summary for %s %s"%(kwargs['start_date'].strftime("%B"), kwargs['start_date'].year)
        from_email = EMAIL_HOST_USER
        to_email = to_email
        body = 'Dear All,<br/>The summary table given below highlights the expected revenue from each market based on the data entered in the system. Please refer to the attachment for detailed analysis.<br/><br/>'
        mandi_row_list = []
        for mandi_obj in sum_expected_revenue.itertuples(index=False):
            mandi_row= '''<tr>
                                        <td>%s</td>
                                        <td>%s</td>
                                        <td>%s</td>
                                        <td>%s</td>
                                    </tr>'''%(mandi_obj.mandi_name, mandi_obj.PickupCost, mandi_obj.loop_payment, mandi_obj.Revenue)
            mandi_row_list.append(mandi_row)
        
        '''%(kwargs['end_date'].day, kwargs['end_date'].strftime("%B"), ''.join(mandi_row_list))
        body= ''.join(body)
        msg = EmailMultiAlternatives(subject, body, from_email, to_email)
        msg.content_subtype = "html"
        msg.attach_file(file_name)
        msg.send()'''

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = "INQUIRY"
            from_email = settings.EMAIL_HOST_USER
            to_email = form.cleaned_data['email']
            body = {
                'name': form.cleaned_data['name'],
                'email': form.cleaned_data['email'],
                'desc': form.cleaned_data['desc'],
            }
            body = "\n".join(body.values())
            msg = EmailMultiAlternatives(subject, body, from_email, to_email)
            msg.content_subtype = "html"
            try:
                msg.send()
            except BadHeaderError:
                return HttpResponse('Invalid Header Found')
            return render(reverse('home'))
    form = ContactForm()
    return render(request, 'contact.html', {'form':form})

def about_view(request):
    return render(request, 'about.html')