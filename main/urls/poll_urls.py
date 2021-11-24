from django.urls import path
from main.views import poll_views as views


urlpatterns = [
  path('', views.getPolls, name="polls"),
  path('<str:pk>/', views.getPoll, name="poll"),
]