from django.db import models
from django.utils import timezone
from django.db.models.signals import pre_delete
from django.dispatch import receiver
import os

def delete_image_file(instance, field_name):
    # Delete the associated image file
    image_field = getattr(instance, field_name)
    if image_field:
        image_path = image_field.path
        if os.path.exists(image_path):
            os.remove(image_path)


class LandingImage(models.Model):
    title = models.CharField(max_length=255)
    landing_image = models.FileField(
        upload_to='landing/static/landing/img', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Landing Image {self.title}"
    
@receiver(pre_delete, sender=LandingImage)
def landingImage_pre_delete(sender, instance, **kwargs):
    delete_image_file(instance, 'landing_image')



class Social_item(models.Model):
    title = models.CharField(max_length=255)
    social_image = models.FileField(
        upload_to='landing/static/landing/img/socials')
    created_at = models.DateField(auto_now_add=True)
    edited_at = models.DateField(auto_now=True)
    
    def __str__(self):
        return f"{self.title}"
    
@receiver(pre_delete, sender=Social_item)
def social_item_pre_delete(sender, instance, **kwargs):
    delete_image_file(instance, 'social_image')


        
class About_item(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    about_image = models.FileField(
        upload_to='landing/static/landing/img/about')
    created_at = models.DateField(auto_now_add=True)
    edited_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"About record: {self.title}"
    
@receiver(pre_delete, sender=About_item)
def about_item_pre_delete(sender, instance, **kwargs):
    delete_image_file(instance, 'about_image')

    
class Landing(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    landing_image = models.ForeignKey(LandingImage, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# Create your models here.
