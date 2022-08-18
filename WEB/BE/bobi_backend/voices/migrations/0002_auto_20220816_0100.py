# Generated by Django 3.2.12 on 2022-08-15 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('voices', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='voice',
            name='user_send',
        ),
        migrations.RemoveField(
            model_name='voice',
            name='voice_link',
        ),
        migrations.AddField(
            model_name='voice',
            name='datetime',
            field=models.CharField(max_length=30, null=True),
        ),
    ]