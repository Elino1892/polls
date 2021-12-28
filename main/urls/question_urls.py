from django.urls import path
from main.views import question_views as views


urlpatterns = [
  path('', views.getQuestions, name="questions"),
]