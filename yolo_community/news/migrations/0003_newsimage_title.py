# Generated by Django 5.0.1 on 2024-03-25 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_alter_news_options_newsimage'),
    ]

    operations = [
        migrations.AddField(
            model_name='newsimage',
            name='title',
            field=models.CharField(default='TITLE', max_length=200),
            preserve_default=False,
        ),
    ]
