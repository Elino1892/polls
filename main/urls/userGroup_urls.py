from django.urls import path
from main.views import userGroup_views as views


urlpatterns = [
  path('', views.getUserGroups, name="user-groups"),
]