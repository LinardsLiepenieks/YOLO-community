from django.db import models
from django.utils import timezone


class LandingImage(models.Model):
    title = models.CharField(max_length=255)
    landing_image = models.FileField(
        upload_to='landing/static/landing/img', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Landing Image {self.title}"


class Social_item(models.Model):
    title = models.CharField(max_length=255)
    social_image = models.FileField(
        upload_to='landing/static/landing/img/socials')
    created_at = models.DateField(auto_now_add=True)
    edited_at = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.title}"


class Landing(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    landing_image = models.ForeignKey(LandingImage, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# Create your models here.
