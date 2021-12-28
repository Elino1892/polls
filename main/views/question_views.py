from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from main.models import Question
from main.serializers import QuestionSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getQuestions(request):
  questions = Question.objects.all()
  serializer = QuestionSerializer(questions, many = True)
  return Response(serializer.data)




