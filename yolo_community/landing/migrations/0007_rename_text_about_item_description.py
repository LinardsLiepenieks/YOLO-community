# Generated by Django 5.0.1 on 2024-02-17 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0006_about_item_text'),
    ]

    operations = [
        migrations.RenameField(
            model_name='about_item',
            old_name='text',
            new_name='description',
        ),
    ]
