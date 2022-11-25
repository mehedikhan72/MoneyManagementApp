# Generated by Django 4.1.3 on 2022-11-22 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('basic', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='finance',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='finance',
            name='daily_cost_estimate',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='finance',
            name='saving_goal',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
        migrations.AlterField(
            model_name='finance',
            name='total_expenditure',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=8),
        ),
    ]