# Generated by Django 4.1.3 on 2022-11-25 11:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0003_dailyexpenditure_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dailyexpenditure',
            name='total_spending',
        ),
    ]