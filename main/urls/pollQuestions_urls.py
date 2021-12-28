from django.urls import path
from main.views import pollQuestion_views as views


urlpatterns = [
  path('', views.getPollQuestions, name="poll-questions"),
]