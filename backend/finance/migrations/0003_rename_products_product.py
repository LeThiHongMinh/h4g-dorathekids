# Generated by Django 5.1.5 on 2025-01-16 06:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0002_voucher'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Products',
            new_name='Product',
        ),
    ]
