# Generated by Django 5.0.1 on 2024-01-27 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0003_alter_landingimage_landing_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Social_item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('social_image', models.FileField(upload_to='landing/static/landing/img/socials')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('edited_at', models.DateField(auto_now=True)),
            ],
        ),
    ]
