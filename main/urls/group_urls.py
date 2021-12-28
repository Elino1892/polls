from django.urls import path
from main.views import group_views as views


urlpatterns = [
  path('', views.getGroups, name="groups"),
  path('delete/<str:pk>/', views.deleteGroup, name="delete-group"),
  path('<str:pk>/', views.getGroup, name="group"),
  path('update/<str:pk>/', views.updateGroup, name="group-update"),
  path('create', views.createGroup, name="group-create"),
]