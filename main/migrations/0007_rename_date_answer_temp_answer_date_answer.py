# Generated by Django 3.2.9 on 2021-11-26 13:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_answer_date_answer'),
    ]

    operations = [
        migrations.RenameField(
            model_name='answer',
            old_name='date_answer_temp',
            new_name='date_answer',
        ),
    ]
