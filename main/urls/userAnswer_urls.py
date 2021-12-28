from django.urls import path
from main.views import answers_views as views


urlpatterns = [
  path('', views.getUserAnswer, name="user-answer"),
]