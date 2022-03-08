import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'polls_app.settings')

app = Celery('polls_app')

app.config_from_object('django.conf:settings', namespace='CELERY')
