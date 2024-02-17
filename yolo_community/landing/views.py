from django.shortcuts import render
from .models import LandingImage, Social_item, About_item

from django.http import HttpResponse


def landing(request):
    context = {}
    context['landing_images'] = LandingImage.objects.all()
    context['social_items'] = Social_item.objects.all()
    context['about_items'] = About_item.objects.all()
    return render(request, 'landing/landing.html', context)
# Create your views here.
