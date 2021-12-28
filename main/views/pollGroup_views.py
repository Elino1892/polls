from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from main.models import PollGroup
from main.serializers import PollGroupSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getPollsGroups(request):
  polls_groups = PollGroup.objects.all()
  serializer = PollGroupSerializer(polls_groups, many = True)
  return Response(serializer.data)
