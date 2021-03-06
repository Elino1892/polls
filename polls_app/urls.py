"""polls_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/polls/', include('main.urls.poll_urls')),
    path('api/users/', include('main.urls.user_urls')),
    path('api/groups/', include('main.urls.group_urls')),
    path('api/user-groups/', include('main.urls.userGroup_urls')),
    path('api/user-polls/', include('main.urls.userPoll_urls')),
    path('api/user-answer/', include('main.urls.userAnswer_urls')),
    path('api/polls-groups/', include('main.urls.pollGroup_urls')),
    path('api/questions/', include('main.urls.question_urls')),
    path('api/poll-questions/', include('main.urls.pollQuestions_urls')),
    path('api/answers/', include('main.urls.answers_urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)