from django.urls import path
from main.views import userPoll_views as views


urlpatterns = [
  path('', views.getUserPolls, name="user-polls"),
]