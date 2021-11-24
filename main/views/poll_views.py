from django.core.checks import messages
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from main.models import Poll
from main.serializers import PollSerializer


@api_view(['GET'])

def getPolls(request):
  polls = Poll.objects.all()
  serializer = PollSerializer(polls, many = True)
  return Response(serializer.data)


@api_view(['GET'])
def getPoll(request, pk):
  poll = Poll.objects.get(ID = pk)
  serializer = PollSerializer(poll, many=False)

  return Response(serializer.data)

