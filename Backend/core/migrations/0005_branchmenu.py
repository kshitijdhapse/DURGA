# Generated by Django 5.0 on 2024-08-16 09:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_branch_alter_fooditem_description'),
    ]

    operations = [
        migrations.CreateModel(
            name='BranchMenu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('foodname', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.fooditem')),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.branch')),
            ],
        ),
    ]
