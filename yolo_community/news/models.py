from django.db import models
from django.db.models.signals import pre_delete, pre_save
from django.dispatch import receiver
import os

def delete_image_file(instance, field_name):
    # Delete the associated image file
    image_field = getattr(instance, field_name)
    if image_field:
        image_path = image_field.path
        if os.path.exists(image_path):
            os.remove(image_path)

class News(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "News"  

    def __str__(self):
        return self.title

class NewsImage(models.Model):
    title = models.CharField(max_length=200)
    news = models.ForeignKey(News, related_name='images', on_delete=models.CASCADE)
    news_image = models.FileField(upload_to='news/static/news/img/news')

    def __str__(self):
        return f"Image {self.title} for {self.news.title}"

@receiver(pre_delete, sender=NewsImage)
def newsimage_pre_delete(sender, instance, **kwargs):
    delete_image_file(instance, 'news_image')

@receiver(pre_save, sender=NewsImage)
def newsimage_pre_save(sender, instance, **kwargs):
    if instance.pk:  # If the instance is being updated (not a new instance)
        try:
            old_instance = sender.objects.get(pk=instance.pk)
        except sender.DoesNotExist:
            return
        if old_instance.news_image != instance.news_image:
            # Delete the previous image file if it's different from the current one
            delete_image_file(old_instance, 'news_image')
