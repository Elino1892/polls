from django.core.serializers import serialize
import io
from django.http.response import HttpResponse
import mock

from django import template
from django.contrib.auth.models import Group, User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import serializers, status

from main.models import GroupOfUsers, Poll, PollQuestion,Question,Answer, UserAnswer, UserPoll, PollGroup, UserGroup
from main.serializers import AnswersSerializer, GroupSerializer, PollGroupSerializer, PollQuestionSerializer, PollSerializer, QuestionSerializer, UserAnswerSerializer, UserGroupSerializer, UserPollSerializer, UserSerializer
from datetime import date, datetime, timezone
from main.views import send_mail as mail
import xlsxwriter
import json

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getPolls(request):
  polls = Poll.objects.all()


  serializer = PollSerializer(polls, many = True)

  
  polls_dict = []

  for x in serializer.data:
    polls_dict.append(dict(x))

  for poll in polls_dict:
    if(not poll['isFinished']):
      formater = "%Y-%m-%dT%H:%M:%S%z"
      poll_date = datetime.strptime(poll['deadline'], formater)
      now_time_string=datetime.strftime(datetime.now(timezone.utc), formater)
      now_time_list= list(now_time_string)
      now_time_list[len(now_time_list) - 3] = '1'
      now_time_new_string = "".join(now_time_list)
      now_time_new_string = now_time_new_string[:len(now_time_list) - 2] + ':' + now_time_new_string[len(now_time_list) - 2:]
      now_time = datetime.strptime(now_time_new_string, formater)
      if(now_time > poll_date):
            poll['isFinished'] = True


  return Response(polls_dict)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getPoll(request, pk):
  poll = Poll.objects.get(ID = pk)
  serializer = PollSerializer(poll, many=False)

  return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getPollsWithAll(request):
  polls = Poll.objects.all()
  serializer = PollSerializer(polls, many = True)
  
  polls_dict = []

  for x in serializer.data:
    polls_dict.append(dict(x))

  for poll in polls_dict:
    if(not poll['isFinished']):
      formater = "%Y-%m-%dT%H:%M:%S%z"
      poll_date = datetime.strptime(poll['deadline'], formater)
      now_time_string=datetime.strftime(datetime.now(timezone.utc), formater)
      now_time_list= list(now_time_string)
      now_time_list[len(now_time_list) - 3] = '1'
      now_time_new_string = "".join(now_time_list)
      now_time_new_string = now_time_new_string[:len(now_time_list) - 2] + ':' + now_time_new_string[len(now_time_list) - 2:]
      now_time = datetime.strptime(now_time_new_string, formater)
      if(now_time > poll_date):
            poll['isFinished'] = True

  poll_finished_all = []

  for poll in polls_dict:

    polls_all = {}

    poll_group = PollGroup.objects.filter(poll = poll['ID'])
    poll_group_serializer = PollGroupSerializer(poll_group, many=True)

    temp_groups = []

    for poll_group_temp in poll_group_serializer.data:
      group = GroupOfUsers.objects.get(ID = poll_group_temp['group'])
      group_serializer = GroupSerializer(group, many=False)
      
     
      temp_groups.append(group_serializer.data)

    user_poll = UserPoll.objects.get(poll = poll['ID'])
    user_poll_serializer = UserPollSerializer(user_poll, many=False)

    user = User.objects.get(id = user_poll_serializer.data['user'])
    user_serializer = UserSerializer(user, many=False)

    poll_question = PollQuestion.objects.filter(poll = poll['ID'])
    poll_question_serializer = PollQuestionSerializer(poll_question, many=True)

    temp_questions = []

    for poll_question_temp in poll_question_serializer.data:

      question = Question.objects.get(ID = poll_question_temp['question'])
      question_serializer = QuestionSerializer(question, many=False)
      
      if(poll['isFinished']):
        answers = Answer.objects.filter(question = question_serializer.data['ID'])
        answers_serializer = AnswersSerializer(answers, many=True)

        question_answers = {
        'question': question_serializer.data,
        'answers': answers_serializer.data
        }
      else:
        question_answers = {
          'question': question_serializer.data,
        }

      temp_questions.append(question_answers)


    polls_all= {
      'poll': poll,
      'groups': temp_groups,
      'user': user_serializer.data,
      'questions': temp_questions
    }
    poll_finished_all.append(polls_all)


  return Response(poll_finished_all)




@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createPoll(request):


  data = request.data['newPoll']

  new_poll_description = data['pollDescription']
  new_questions_answers = data['questionsAndAnswers']


  all_groups = []

  for group in new_poll_description['groupList']:
    groupInstance = GroupOfUsers.objects.get(ID = group['ID'])

    user_group = list(UserGroup.objects.filter(group = group['ID']).values())
    all_groups.append(user_group)


  for group in all_groups:
    for user in group:
      userInstance = User.objects.get(id = user['user_id']) 
      groupInstance = GroupOfUsers.objects.get(ID = user['group_id'])

      poll = Poll.objects.create(
        poll_name = new_poll_description['pollName'],
        poll_description = new_poll_description['pollDescription'],
        deadline = new_poll_description['pollDeadline'],      
        isFinished = False
      )

      PollGroup.objects.create(
        poll = poll,
        group = groupInstance
      )

      isUserPollExisted = UserPoll.objects.filter(poll = poll.ID, user=userInstance.id).exists()
      if(not isUserPollExisted):
        UserPoll.objects.create(
          user = userInstance,
          poll = poll
        )
        mail.send_mail(userInstance.first_name, groupInstance.group_name,poll.poll_name,poll.ID,userInstance.email)

      for question in new_questions_answers:
        new_question = Question.objects.create(
          question = question['questionText'],
          is_single_choice = question['type']['isSingleChoice'],
          is_multi_choice = question['type']['isMultiChoice'],
          is_open = question['type']['isOpen'],
          is_date_choice = question['type']['isDateChoice'],
        )
        PollQuestion.objects.create(
          poll = poll,
          question = new_question,
        )
        if(question['type']['isSingleChoice'] or question['type']['isMultiChoice']):
          for new_answer in question['answers']:
            answer = Answer.objects.create(
              answer = new_answer['answerText'],
              question = new_question
            )
            UserAnswer.objects.create(
              user = userInstance,
              answer = answer
            )
        elif(question['type']['isOpen'] or question['type']['isDateChoice']):
            answer = Answer.objects.create(
              question = new_question
            )
            UserAnswer.objects.create(
              user = userInstance,
              answer = answer
            )

  return Response(data)


@api_view(['DELETE'])
def deletePoll(request, pk):
  poll = Poll.objects.get(ID = pk)
  poll.delete()
  return Response('Poll Deleted')


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def downloadReport(request, pk):
  user = request.user

  

  polls = list(Poll.objects.filter(poll_name=pk, isFinished = True).values())
  poll_questions_id = []
  for poll in polls:
    poll_question_id = list(PollQuestion.objects.filter(poll = poll['ID']).values())
    poll_questions_id.append(poll_question_id)


  questions = []
  for poll_array in poll_questions_id:
    for poll_id in poll_array:
      question = Question.objects.get(ID = poll_id['question_id'])
      questions.append(question)

  
  questions_temp = []
  for quest in questions:

    flag = False

    if(len(questions_temp)):
      for question_temp in questions_temp:
        if(question_temp['question_name'] == quest.question):
          question_temp['questions_array_id'].append(quest.ID)
          flag = True
          break

    
    if(not flag or not len(questions_temp)):
      array = []
      array.append(quest.ID)
      temp = {
        'ID': quest.ID,
        'question_name': quest.question,
        'is_single_choice': quest.is_single_choice,
        'is_multi_choice': quest.is_multi_choice,
        'is_open': quest.is_open,
        'is_date_choice': quest.is_date_choice,
        'questions_array_id': array
      }
      questions_temp.append(temp)

  question_answers = [] 

  for quest in questions_temp:

      


      type_question = check_type_question(quest)

      

      all_answers = []

      for answers_id in quest['questions_array_id']:
        all_answers_temp = list(Answer.objects.filter(question_id = answers_id).values())
        all_answers.append(all_answers_temp)

      count_answers = []


      for answers in all_answers:
        for answer in answers:
          flag = False

          if(len(count_answers)):
              for count_answer in count_answers:
                if(quest['is_single_choice'] or quest['is_multi_choice']):
                  if(count_answer['answer_text'] == answer['answer']):
                    if(answer['is_marked']):
                      count_answer['count'] += 1
                      count_answer['count_all_answers'] += 1
                    else:
                      count_answer['count_all_answers'] += 1
                    flag = True
                    break
                elif(quest['is_open']):
                  if(count_answer['answer_text'] == 'answers_open'):
                    count_answer['answers'].append(answer['open_answer'])
                    count_answer['count_all_answers'] += 1
                    flag = True
                    break
                elif(quest['is_date_choice']):
                  if(count_answer['answer_text'] == 'answers_date'):
                    date = answer['date_answer'].strftime("%d-%m-%Y")
                    count_answer['answers'].append(date)
                    count_answer['count_all_answers'] += 1
                    flag = True
                    break


          
          if(not flag or not len(questions_temp)):
            if(answer['is_marked']):
              answer_obj = {
                'answer_text': answer['answer'],
                'count': 1,
                'count_all_answers': 1,

              }

            elif(quest['is_single_choice'] or quest['is_multi_choice']):
              answer_obj = {
                'answer_text': answer['answer'],
                'count': 0,
                'count_all_answers': 1,

              }

            elif(quest['is_open']):
              answer_obj = {
                'answer_text': 'answers_open',
                'answers': [answer['open_answer']],
                'count_all_answers': 1,

              }
            elif(quest['is_date_choice']):
              date = answer['date_answer'].strftime("%d-%m-%Y")

              answer_obj = {
                'answer_text': 'answers_date',
                'answers': [date],
                'count_all_answers': 1,

              }
            count_answers.append(answer_obj)
              
      question_answer = {
        'question_text': quest['question_name'],
        'question_type': type_question,
        'answers': count_answers
      }

      question_answers.append(question_answer)






  poll_excel_object = {
    'poll_name': pk,
    'question_answers': question_answers
  }



  output = io.BytesIO()

  workbook = xlsxwriter.Workbook(output, {'in_memory': True})

  bold_format = workbook.add_format({'bold': True, })

  question_text_format = workbook.add_format({'bold': True, })
  question_text_format.bg_color = '#B7DEE8'

  question_text_format_italics = workbook.add_format({'bold': True, })
  question_text_format_italics.bg_color = '#B7DEE8'
  question_text_format_italics.set_align('center')
  question_text_format_italics.set_italic()

  answer_format = workbook.add_format({'bold': True, })
  answer_format.bg_color = '#F2F2F2'

  cell_format = workbook.add_format()
  cell_format.set_align('top')
  cell_format.set_align('left')

  cell_format_center = workbook.add_format({'bold': True, })
  cell_format_center.set_align('center')

  for index, question in enumerate(poll_excel_object['question_answers']):


    worksheet = workbook.add_worksheet(f"Pytanie {index + 1}")

    worksheet.write('A1',f"Pytanie {index + 1}", bold_format)
    worksheet.write('A2',question['question_text'], question_text_format)
    worksheet.write('B2','', question_text_format)
    worksheet.write('C2','', question_text_format)
    worksheet.write('A3','Odpowiedzi', answer_format)
    
    worksheet.write('B3','', answer_format)
    worksheet.write('C3','Og????em', answer_format)
    worksheet.set_column(0,1,width=30)
    worksheet.set_row(0, height=30)
    worksheet.set_row(1, height=30)
    worksheet.set_row(2, height=30)

    start_index_column_answer = 4

    
    for answer in question['answers']:
      
      if(question['question_type'] == 'is_single_choice' or question['question_type'] == 'is_multi_choice'):
        worksheet.write(f"B{start_index_column_answer}", answer['answer_text'], cell_format)
        worksheet.write(f"B{start_index_column_answer + len(question['answers']) + 3}", answer['answer_text'], cell_format)
        worksheet.write(f"C{start_index_column_answer}", answer['count'], cell_format_center)
        worksheet.write(f"C{start_index_column_answer + len(question['answers']) + 3}", f"{round(answer['count'] / answer['count_all_answers'],2) * 100:.0f}%", cell_format_center)
        start_index_column_answer += 1
      elif(question['question_type'] == 'is_open' or question['question_type'] == 'is_date_choice'):
        for answer_temp in answer['answers']:
          worksheet.write(f"B{start_index_column_answer}", answer_temp, cell_format)
          worksheet.write(f"B{start_index_column_answer + len(answer['answers']) + 3}", answer_temp, cell_format)
          start_index_column_answer += 1
      

    worksheet.write(f"A{start_index_column_answer}", '', question_text_format)
    worksheet.write(f"B{start_index_column_answer}", '', question_text_format)
    worksheet.write(f"C{start_index_column_answer}", question['answers'][0]['count_all_answers'], question_text_format_italics)
    if(question['question_type'] == 'is_single_choice' or question['question_type'] == 'is_multi_choice'):
      worksheet.write(f"C{start_index_column_answer + len(question['answers']) + 3}", '100%', question_text_format_italics)
    else:
      worksheet.write(f"C{start_index_column_answer + question['answers'][0]['count_all_answers'] + 3}", '100%', question_text_format_italics)
    worksheet.write(f"A{start_index_column_answer + 2}",'Odpowiedzi', answer_format)
    worksheet.write(f"B{start_index_column_answer + 2}",'', answer_format)
    worksheet.write(f"C{start_index_column_answer + 2}",'Og????em', answer_format)
    

  workbook.close()

  output.seek(0)
  response = HttpResponse(output, content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  response['Content-Disposition'] = "attachment; filename=Raport_ankieta.xlsx"

  output.close()


  return response



@api_view(['GET'])
def downloadReportAdmin(request, pk):
  
  polls = list(Poll.objects.filter(poll_name=pk, isFinished = True).values())

  poll_questions_id = []
  for poll in polls:
    poll_question_id = list(PollQuestion.objects.filter(poll = poll['ID']).values())
    poll_questions_id.append(poll_question_id)



  questions = []
  for poll_array in poll_questions_id:
    for poll_id in poll_array:
      question = Question.objects.get(ID = poll_id['question_id'])
      questions.append(question)


  questions_temp = []
  for quest in questions:

    flag = False
    
    if(len(questions_temp)):
      for question_temp in questions_temp:
        if(question_temp['question_name'] == quest.question):
          question_temp['questions_array_id'].append(quest.ID)
          flag = True
          break

    
    if(not flag or not len(questions_temp)):

      array = []
      array.append(quest.ID)
      temp = {
        'ID': quest.ID,
        'question_name': quest.question,
        'is_single_choice': quest.is_single_choice,
        'is_multi_choice': quest.is_multi_choice,
        'is_open': quest.is_open,
        'is_date_choice': quest.is_date_choice,
        'questions_array_id': array
      }
      questions_temp.append(temp)


  question_answers = [] 

  for quest in questions_temp:

      


      type_question = check_type_question(quest)

      

      all_answers = []

      for answers_id in quest['questions_array_id']:
        all_answers_temp = list(Answer.objects.filter(question_id = answers_id).values())
        all_answers.append(all_answers_temp)



      count_answers = []


      for answers in all_answers:
        for answer in answers:

    


          user_answer = UserAnswer.objects.get(answer = answer['ID'])
          user_answer_serializer = UserAnswerSerializer(user_answer, many=False)
          user_answer = user_answer_serializer.data

          user = User.objects.get(id=user_answer['user'])
          user_serializer = UserSerializer(user, many=False)
          user = user_serializer.data

          flag = False

          if(len(count_answers)):
              for count_answer in count_answers:
                if(quest['is_single_choice'] or quest['is_multi_choice']):
                  if(count_answer['answer_text'] == answer['answer']):
                    if(answer['is_marked']):
                      count_answer['count'] += 1
                      count_answer['count_all_answers'] += 1
                      if(count_answer['user'] != user['email'] ):
                        count_answer['user'] = user['email']
                      
                    else:
                      count_answer['count_all_answers'] += 1
                      if(count_answer['user'] != user['email'] ):
                        count_answer['user'] = user['email']
                    flag = True
                    break
                elif(quest['is_open']):
                  if(count_answer['answer_text'] == 'answers_open'):
                    count_answer['answers'].append(answer['open_answer'])
                    count_answer['count_all_answers'] += 1
                    if(count_answer['user'] != user['email']):
                        count_answer['user'] = user['email']
                    flag = True
                    break
                elif(quest['is_date_choice']):
                  if(count_answer['answer_text'] == 'answers_date'):
                    date = answer['date_answer'].strftime("%d-%m-%Y")
                    count_answer['answers'].append(date)
                    count_answer['count_all_answers'] += 1
                    if(count_answer['user'] != user['email'] ):
                        count_answer['user'] = user['email']
                    flag = True
                    break



          
          if(not flag or not len(questions_temp)):
            if(answer['is_marked']):
              answer_obj = {
                'answer_text': answer['answer'],
                'count': 1,
                'count_all_answers': 1,
                'user': user['email'],

              }

            elif(quest['is_single_choice'] or quest['is_multi_choice']):
              answer_obj = {
                'answer_text': answer['answer'],
                'count': 0,
                'count_all_answers': 1,
                'user': user['email'],

              }

            elif(quest['is_open']):
              answer_obj = {
                'answer_text': 'answers_open',
                'answers': [answer['open_answer']],
                'count_all_answers': 1,
                'user': user['email'],
              }
            elif(quest['is_date_choice']):
              date = answer['date_answer'].strftime("%d-%m-%Y")

              answer_obj = {
                'answer_text': 'answers_date',
                'answers': [date],
                'count_all_answers': 1,
                'user': user['email'], 
              }
            count_answers.append(answer_obj)

              
      question_answer = {
        'question_text': quest['question_name'],
        'question_type': type_question,
        'answers': count_answers
      }

      question_answers.append(question_answer)







  poll_excel_object = {
    'poll_name': pk,
    'question_answers': question_answers
  }







  output = io.BytesIO()

  workbook = xlsxwriter.Workbook(output, {'in_memory': True})

  bold_format = workbook.add_format({'bold': True, })

  question_text_format = workbook.add_format({'bold': True, })
  question_text_format.bg_color = '#B7DEE8'

  question_text_format_italics = workbook.add_format({'bold': True, })
  question_text_format_italics.bg_color = '#B7DEE8'
  question_text_format_italics.set_align('center')
  question_text_format_italics.set_italic()

  answer_format = workbook.add_format({'bold': True, })
  answer_format.bg_color = '#F2F2F2'

  cell_format = workbook.add_format()
  cell_format.set_align('top')
  cell_format.set_align('left')

  cell_format_center = workbook.add_format({'bold': True, })
  cell_format_center.set_align('center')

  for index, question in enumerate(poll_excel_object['question_answers']):



    worksheet = workbook.add_worksheet(f"Pytanie {index + 1}")

    worksheet.write('A1',f"Pytanie {index + 1}", bold_format)
    worksheet.write('A2',question['question_text'], question_text_format)
    worksheet.write('B2','', question_text_format)
    worksheet.write('C2','', question_text_format)
    worksheet.write('A3','Odpowiedzi', answer_format)
    
    worksheet.write('B3','', answer_format)
    worksheet.write('C3','Og????em', answer_format)
    
    worksheet.set_column(0,1,width=30)
    worksheet.set_row(0, height=30)
    worksheet.set_row(1, height=30)
    worksheet.set_row(2, height=30)

    start_index_column_answer = 4

    
    for answer in question['answers']:
      
      if(question['question_type'] == 'is_single_choice' or question['question_type'] == 'is_multi_choice'):
        worksheet.write('D3','test1@gmail.com')
        worksheet.write('E3','schronisko.rzeszow@gmail.com')
        if(question['question_type'] == 'is_single_choice'):
          worksheet.write('D4',0)
          worksheet.write('D5',0)
          worksheet.write('D6',1)
          worksheet.write('E4',1)
          worksheet.write('E5',0)
          worksheet.write('E6',0)
        else:
          worksheet.write('D4',0)
          worksheet.write('D5',1)
          worksheet.write('D6',1)
          worksheet.write('E4',1)
          worksheet.write('E5',0)
          worksheet.write('E6',1)
        worksheet.write(f"B{start_index_column_answer}", answer['answer_text'], cell_format)
        worksheet.write(f"B{start_index_column_answer + len(question['answers']) + 3}", answer['answer_text'], cell_format)
        worksheet.write(f"C{start_index_column_answer}", answer['count'], cell_format_center)
        worksheet.write(f"C{start_index_column_answer + len(question['answers']) + 3}", f"{round(answer['count'] / answer['count_all_answers'],2) * 100:.0f}%", cell_format_center)
        start_index_column_answer += 1
      elif(question['question_type'] == 'is_open' or question['question_type'] == 'is_date_choice'):
        worksheet.write('D4','test1@gmail.com')
        worksheet.write('D5','schronisko.rzeszow@gmail.com')
        for answer_temp in answer['answers']:
          worksheet.write(f"B{start_index_column_answer}", answer_temp, cell_format)
          worksheet.write(f"B{start_index_column_answer + len(answer['answers']) + 3}", answer_temp, cell_format)
          start_index_column_answer += 1
      

    worksheet.write(f"A{start_index_column_answer}", '', question_text_format)
    worksheet.write(f"B{start_index_column_answer}", '', question_text_format)
    worksheet.write(f"C{start_index_column_answer}", question['answers'][0]['count_all_answers'], question_text_format_italics)
    if(question['question_type'] == 'is_single_choice' or question['question_type'] == 'is_multi_choice'):
      worksheet.write(f"C{start_index_column_answer + len(question['answers']) + 3}", '100%', question_text_format_italics)
    else:
      worksheet.write(f"C{start_index_column_answer + question['answers'][0]['count_all_answers'] + 3}", '100%', question_text_format_italics)
    worksheet.write(f"A{start_index_column_answer + 2}",'Odpowiedzi', answer_format)
    worksheet.write(f"B{start_index_column_answer + 2}",'', answer_format)
    worksheet.write(f"C{start_index_column_answer + 2}",'Og????em', answer_format)
    

  workbook.close()

  output.seek(0)
  response = HttpResponse(output, content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  response['Content-Disposition'] = "attachment; filename=Raport_ankieta.xlsx"

  output.close()



  return response


def check_type_question(arg):
   if(arg['is_single_choice']):
     return 'is_single_choice'
   elif(arg['is_multi_choice']):
     return 'is_multi_choice'
   elif(arg['is_open']):
     return 'is_open'
   elif(arg['is_date_choice']):
     return 'is_date_choice'
