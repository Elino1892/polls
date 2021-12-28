from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from django.contrib.auth.models import  User
from main.models import GroupOfUsers, Poll, UserGroup
from main.serializers import GroupSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getGroups(request):
  groups = GroupOfUsers.objects.all()
  serializer = GroupSerializer(groups, many = True)
  return Response(serializer.data)

@api_view(['GET'])
def getGroup(request, pk):
    group = GroupOfUsers.objects.get(ID = pk)
    serializer = GroupSerializer(group, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createGroup(request):
    # user = request.user
    data = request.data

    # print(data)

    group = GroupOfUsers.objects.create(
      group_name = data['name']
    )

    for user in data['users']:
      # print(user)
      # print('\n')
      userInstance = User.objects.get(id = user['id'])
      UserGroup.objects.create(
        user = userInstance,
        group = group
      )

    # serializer = GroupSerializer(group, many=False)
    return Response()


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateGroup(request, pk):
    data = request.data
    group = GroupOfUsers.objects.get(ID=pk)

    group.group_name = data['name']

    group.save()

    serializer = GroupSerializer(group, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
def deleteGroup(request,pk):
  group = GroupOfUsers.objects.get(ID = pk)
  group.delete()
  return Response('Group Deleted')







