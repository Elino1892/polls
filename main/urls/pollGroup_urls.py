from django.urls import path
from main.views import pollGroup_views as views


urlpatterns = [
  path('', views.getPollsGroups, name="polls-groups"),
]