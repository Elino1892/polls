from django.urls import path
from main.views import poll_views as views
from main.views import pollQuestion_views as poll_question_views
from main.views import answers_views as answers_views


urlpatterns = [
  path('', views.getPolls, name="polls"),
  path('<str:pk>/', poll_question_views.getQuestionsByPollId, name="questions-by-poll-id"),
  path('<str:pk>/finished-poll', answers_views.updateAnswersFromUser, name="finished-poll"),
  path('<str:pk>/filled-poll', poll_question_views.getQuestionsByPollId, name="filled-poll"),
  path('created-poll', views.createPoll, name="created-poll"),
  path('report/<str:pk>', views.downloadReport, name="downloadReport"),
  path('admin/report/<str:pk>', views.downloadReportAdmin, name="downloadReportAdmin"),
  path('all-data', views.getPollsWithAll, name="polls-with-all"),
  path('delete/<str:pk>/', views.deletePoll, name="poll-delete")
  # path('<str:pk>/', views.getPoll, name="poll"),
]