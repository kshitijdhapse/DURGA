# Generated by Django 5.0 on 2024-08-18 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_rename_location_branch_branch'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='branch',
            field=models.CharField(max_length=50, verbose_name='Branch'),
        ),
    ]