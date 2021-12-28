from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Answer, GroupOfUsers, Poll, PollGroup, PollQuestion, Question, UserAnswer, UserGroup, UserPoll
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)
    name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin', 'name']

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'isAdmin','name', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class GroupSerializer(serializers.ModelSerializer):
    class Meta: 
        model = GroupOfUsers
        fields = '__all__'

class UserGroupSerializer(serializers.ModelSerializer):
    class Meta: 
        model = UserGroup
        fields = '__all__'

class UserPollSerializer(serializers.ModelSerializer):
    class Meta: 
        model = UserPoll
        fields = '__all__'

class PollGroupSerializer(serializers.ModelSerializer):
    class Meta: 
        model = PollGroup
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
  class Meta:
    model = Poll
    fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Question
    fields = '__all__'

class PollQuestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = PollQuestion
    fields = '__all__'

class AnswersSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = '__all__'

class UserAnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserAnswer
    fields = '__all__'



