from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from main.models import Answer, Poll, UserAnswer
from main.serializers import AnswersSerializer, PollSerializer, UserAnswerSerializer, UserSerializerWithToken


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getAnswers(request):
  answers = Answer.objects.all()
  serializer = AnswersSerializer(answers, many = True)
  return Response(serializer.data)



@api_view(['PUT', 'POST'])
# @permission_classes([IsAuthenticated])
def updateAnswersFromUser(request, pk):

  answers_from_user = request.data

  user = request.user

  answers = Answer.objects.all()

  

  for answer in answers:
    for answer_from_user in answers_from_user:
      if type(answer_from_user) is dict and str(answer.ID) == answer_from_user['id']:
          if answer_from_user['type'] == 'radio' and answer_from_user['value'] == answer.answer:
            answer.is_marked = True
            answer.save()
          elif answer_from_user['type'] == 'textarea':
            answer.open_answer = answer_from_user['value']
            answer.save()
          elif answer_from_user['type'] == 'date':
            answer.date_answer = answer_from_user['value']
            answer.save()
      elif type(answer_from_user) is list:
        for x in answer_from_user:
          if str(answer.ID) == x['id'] and x['type'] == 'checkbox':
            answer.is_marked = True
            answer.save()


  user_poll = Poll.objects.get(ID = pk)

  user_poll.isFinished = True
  user_poll.save()



  serializer_answers = AnswersSerializer(answers, many = True)



  return Response(serializer_answers.data)




@api_view(['GET'])
def getUserAnswer(request):
  user_answers = UserAnswer.objects.all()
  serializer = UserAnswerSerializer(user_answers, many = True)
  return Response(serializer.data)

  






