from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from main.serializers import GroupSerializer, UserGroupSerializer, UserSerializer, UserSerializerWithToken

from django.contrib.auth.models import  User

from main.models import UserGroup, GroupOfUsers

from django.contrib.auth.hashers import make_password





class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
          data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
  data = request.data

  try:
      user = User.objects.create(
        first_name = data['name'],
        username = data['email'],
        email = data['email'],
        password = make_password(data['password'])
      )

      group_everybody = GroupOfUsers.objects.get(group_name = 'Wszyscy')

      UserGroup.objects.create(
        user = user,
        group = group_everybody
      )

      serializer = UserSerializerWithToken(user, many=False)
      return Response(serializer.data)
  except:                                       
      message = {'detail': 'Istnieje już użytkownik z tym adresem email!'}
      return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
  user = request.user
  serializer = UserSerializerWithToken(user, many = False)

  data = request.data

  user.first_name = data['name']
  user.username = data['email']
  user.email = data['email']

  if data['password'] != '':
    user.password = make_password(data['password'])

  user.save()

  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many = False)
  return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
  users = User.objects.all()
  user_serializer = UserSerializer(users, many = True)
  all_users_groups = []

  for user in user_serializer.data:

    user_groups = {
      'user': user,
      'groups': [],
    }

    user_group = UserGroup.objects.filter(user = user['id'])
    user_group_serializer = UserGroupSerializer(user_group, many=True)

    for user_group in user_group_serializer.data:
          group = GroupOfUsers.objects.filter(ID = user_group['group'])
          group_serializer = GroupSerializer(group, many=True)
          user_groups['groups'].append(group_serializer.data[0])
    all_users_groups.append(user_groups)

  return Response(all_users_groups)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    user_serializer = UserSerializer(user, many=False)

    user_group_object = {
      'userInfo': user_serializer.data,
      'groups': [],
    }


    user_group_instance = UserGroup.objects.filter(user = user_serializer.data['id'])
    user_group_serializer = UserGroupSerializer(user_group_instance, many=True)

    
    for user_group in user_group_serializer.data:
          group = GroupOfUsers.objects.get(ID = user_group['group'])
          group_serializer = GroupSerializer(group, many=False)
          user_group_object['groups'].append(group_serializer.data)
    

    return Response(user_group_object)


@api_view(['PUT', 'DELETE', 'POST'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    user_groups = UserGroup.objects.filter(user = user.id)
    user_groups_serializer = UserGroupSerializer(user_groups, many = True)

    everybody_group = GroupOfUsers.objects.get(group_name = 'Wszyscy')
    everybody_group_serializer = GroupSerializer(everybody_group, many=False)
    id_everybody_group = everybody_group_serializer.data['ID']


    for user_group in user_groups_serializer.data:
        if(user_group['group'] != id_everybody_group):
          for group in data['userGroups']:
            if(group['ID'] == user_group['group']):
              if(not group['isBelong']):
                  user_group_delete = UserGroup.objects.get(user = user.id, group = group['ID'])
                  user_group_delete.delete()
            else:
              if(group['isBelong']):
                groupInstance = GroupOfUsers.objects.get(ID = group['ID'])
                UserGroup.objects.create(
                  user = user,
                  group = groupInstance
                )
    if(len(user_groups) == 1 and user_groups_serializer.data[0]['group'] ==  id_everybody_group):
      for group in data['userGroups']:
        if(group['isBelong'] and group['ID'] != id_everybody_group):
          groupInstance = GroupOfUsers.objects.get(ID = group['ID'])
          UserGroup.objects.create(
              user = user,
              group = groupInstance
          )
    

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')