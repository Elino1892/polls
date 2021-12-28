import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'polls_app.settings')

app = Celery('polls_app')

app.config_from_object('django.conf:settings', namespace='CELERY')
# app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# @app.on_after_configure.connect
# def setup_periodic_tasks(sender, **kwargs):
#   sender.add_periodic_task(10.0, test.s('hello', name='add every 10'))




@app.task
def test(arg):
  print(arg)