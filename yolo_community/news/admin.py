from django.contrib import admin
from .models import News, NewsImage

class NewsImageInline(admin.TabularInline): 
    model = NewsImage
    extra = 1  # Number of empty forms to display for adding new NewsImage instances

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    inlines = [NewsImageInline]
admin.site.register(NewsImage)

# Register your models here.
