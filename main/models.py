from django.db import models
from django.contrib.auth.models import User
# from datetime import datetime

# class User(models.Model):
#     ID = models.AutoField(primary_key=True, editable=False)
#     username = models.CharField(max_length=50)
#     email = models.CharField(max_length=50)
#     password = models.CharField(max_length=50)

#     def __str__(self):
#         return self.username

class Poll(models.Model):
    ID = models.AutoField(primary_key=True)
    poll_name = models.CharField(max_length=50)
    poll_description = models.TextField(blank=True, null=True)
    deadline = models.DateTimeField()
    isFinished = models.BooleanField(default = False)
    # createdAt = models.DateTimeField(auto_now_add=True)
    # @property
    # def is_past_due(self):
    #     if(datetime.now() > self.deadline):
    #         self.isFinished = True

    def __str__(self):
        return '%s - %s' % (self.poll_name, self.ID)
        #  % (answer, self.question)

class Question(models.Model):
    ID = models.AutoField(primary_key=True)
    question = models.CharField(max_length=120)
    is_single_choice = models.BooleanField(default=False)
    is_multi_choice = models.BooleanField(default=False)
    is_open = models.BooleanField(default=False)
    is_date_choice = models.BooleanField(default=False)

    def __str__(self):
        return self.question

class Answer(models.Model):
    ID = models.AutoField(primary_key=True)
    answer = models.CharField(max_length=120,blank=True, null=True)
    is_marked = models.BooleanField(default=False)
    open_answer = models.TextField(blank=True, null=True)
    date_answer = models.DateField(blank=True, null=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)

    def __str__(self):
        if(self.answer):
            answer = self.answer
        elif(self.open_answer):
            answer = self.open_answer
        elif(self.date_answer):
            answer = self.date_answer
        else:
            answer = None
        
        return '%s : %s' % (answer, self.question)

class GroupOfUsers(models.Model):
    ID = models.AutoField(primary_key=True)
    group_name = models.CharField(max_length=80)

    def __str__(self):
        return self.group_name

class UserGroup(models.Model):
    ID = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(GroupOfUsers, on_delete=models.CASCADE)

    def __str__(self):
        return '%s : %s' % (self.user, self.group)

class UserAnswer(models.Model):
    ID = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)

    # def __str__(self):
    #     return '%s : %s' % (self.user, self.answer)

class UserPoll(models.Model):
    ID = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)

    def __str__(self):
        return '%s : %s' % (self.user, self.poll)

class PollGroup(models.Model):
    ID = models.AutoField(primary_key=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    group = models.ForeignKey(GroupOfUsers, on_delete=models.CASCADE)

    def __str__(self):
        return '%s : %s' % (self.poll, self.group)

class PollQuestion(models.Model):
    ID = models.AutoField(primary_key=True)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return '%s : %s' % (self.poll, self.question)