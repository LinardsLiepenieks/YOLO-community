# Generated by Django 5.0.1 on 2024-01-22 20:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0002_remove_landingimage_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landingimage',
            name='landing_image',
            field=models.FileField(blank=True, null=True, upload_to='landing/static/landing/img'),
        ),
    ]
