from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Poll)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(GroupOfUsers)
admin.site.register(UserGroup)
admin.site.register(UserAnswer)
admin.site.register(UserPoll)
