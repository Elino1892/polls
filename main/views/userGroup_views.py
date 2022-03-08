from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from main.models import UserGroup
from main.serializers import UserGroupSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUserGroups(request):
  user_groups = UserGroup.objects.all()
  serializer = UserGroupSerializer(user_groups, many = True)
  return Response(serializer.data)


