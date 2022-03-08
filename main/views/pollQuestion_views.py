from django.contrib.auth.models import User
from django.db.models.query_utils import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
import json

from main.models import PollQuestion, Poll, Question, Answer
from main.serializers import PollQuestionSerializer, PollSerializer, QuestionSerializer, AnswersSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getPollQuestions(request):
  poll_questions = PollQuestion.objects.all()
  serializer = PollQuestionSerializer(poll_questions, many = True)
  return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getQuestionsByPollId(request,pk):

  poll = Poll.objects.get(ID = pk)
  serializer_poll = PollSerializer(poll, many=False)

  poll_questions = PollQuestion.objects.filter(poll = pk)
  serializer_poll_question = PollQuestionSerializer(poll_questions, many = True)

  questions = Question.objects.all()
  serializer_question = QuestionSerializer(questions, many = True)

  answers = Answer.objects.all()
  serializer_answers = AnswersSerializer(answers, many=True)

  poll_questions_dict = []
  questions_dict = []
  answers_dict = []

  for x in serializer_poll_question.data:
    poll_questions_dict.append(dict(x))

  for x in serializer_question.data:
    questions_dict.append(dict(x))

  for x in serializer_answers.data:
    answers_dict.append(dict(x))

  questions_and_answers = []

  for question in questions_dict:
    for poll_question in poll_questions_dict:
        if question['ID'] == poll_question['question']:
          question = {
            "ID": question['ID'],
            "question_text": question['question'],
            "type": {
            "is_single_choice": question['is_single_choice'],
            "is_multi_choice": question['is_multi_choice'],
            "is_open": question['is_open'],
            "is_date_choice": question['is_date_choice'],
            },
            "answers": [],
          }
          for ans in answers_dict: 
            if ans['question'] == question['ID']:
              if question['type']['is_single_choice']:
                answer = {
                    "id": ans['ID'],
                    "answer_text": ans['answer'],
                    "isMarked": ans['is_marked']
                }
              elif question['type']['is_multi_choice']:
                answer = {
                  "id": ans['ID'],
                  "answer_text": ans['answer'],
                  "isMarked": ans['is_marked']
                }
              elif question['type']['is_open']:
                answer = {
                  "id": ans['ID'],
                  "answer_text": '',
                  "openAnswer": ans['open_answer']
                }
              elif question['type']['is_date_choice']:
                answer = {
                  "id": ans['ID'],
                  "answer_text": '',
                  "dateAnswer": ans['date_answer']
                }
              question['answers'].append(answer)
    try:
      if 'type' in question:
        questions_and_answers.append(question)
    except:
      None
    

    context = {
    "poll_info": serializer_poll.data,
    "questions_answers": questions_and_answers,
    }

  return Response(context)