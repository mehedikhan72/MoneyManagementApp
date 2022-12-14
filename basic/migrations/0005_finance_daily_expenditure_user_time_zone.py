# Generated by Django 4.1.3 on 2022-11-25 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0004_remove_dailyexpenditure_total_spending'),
    ]

    operations = [
        migrations.AddField(
            model_name='finance',
            name='daily_expenditure',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='user',
            name='time_zone',
            field=models.CharField(default='UTC', max_length=128),
        ),
    ]
