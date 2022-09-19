from .serializer import ProjectSerializer, AccessSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Project, Access, Users, Permissions
from django.db.models import Q


class PermissionApi(APIView):
    """Checks what permissions user have"""

    def post(self, request):
        try:
            data = request.data
            user = Users.objects.get(id=data.get('user_id'))
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ReadProjectApi(APIView):
    """List of project with access"""

    def post(self, request):
        data = request.data
        access_queryset = Access.objects.filter(user_id=data.get('user_id')).values_list('project', flat=True)
        projects = Project.objects.filter(id__in=access_queryset)
        print("projects>>>>>", projects)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReadSingleProjectApi(APIView):
    """Details of single project and user's accesses for that project"""

    def post(self, request):
        try:
            data = request.data
            access_queryset = Access.objects.filter(
                Q(user_id=data.get('user_id')) & Q(project=data.get('project_id'))).values_list('permit', flat=True)
            accesses = [i for i in access_queryset]
            projects = Project.objects.filter(id=data.get('project_id')).first()
            serializer = ProjectSerializer(projects, many=False)
            return Response(data={"Project": serializer.data, 'Permissions': accesses}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CreateProjectApi(APIView):
    def post(self, request):
        try:
            data = request.data
            user = Users.objects.get(id=data.get('user_id'))
            permissions = [i for i in user.access.all().values_list('name', flat=True)]
            if 'Create' not in permissions:
                return Response({"warning": "You don't have Create permissions"})
            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                project = serializer.save()
            else:
                return Response({"error": serializer.errors()})
            access_data = {'project': project.id, 'user': data['for_user'], 'permit': data['for_user_permission']}
            access_serializer = AccessSerializer(data=access_data)

            if access_serializer.is_valid():
                access_serializer.save()
            else:
                project = Project.objects.filter(id=project.id).first()
                project.delete()
                return Response({"error": serializer.errors()})
            return Response(data={"message": "Project created successfully", "project id": project.id},
                            status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UpdateProjectApi(APIView):
    def post(self, request):
        try:
            data = request.data
            user = Users.objects.get(id=data.get('user_id'))
            project = Project.objects.get(id=data.get('project_id'))
            access = Access.objects.filter(Q(user=user) & Q(project=project)).first()
            if access.permit.lower() == data.get('action').lower() == 'delete':
                project.delete()
                access.delete()
                return Response(data={"message": "deleted successfully"})
            elif access.permit.lower() == data.get('action').lower() == 'update':
                project.name = data.get('name')
                project.state = data.get('state')
                project.date = data.get('date')
                project.save()
                return Response(data={"message": "updated successfully"})
            else:
                return Response(data={"message": "You do not have permission to perform this action."})


            serializer = ProjectSerializer(data=request.data)
            if serializer.is_valid():
                project = serializer.save()
            else:
                return Response({"error": serializer.errors()})

            access_data = {'project': project.id, 'user': data['for_user'], 'permit': data['for_user_permission']}
            access_serializer = AccessSerializer(data=access_data)
            if access_serializer.is_valid():
                access_serializer.save()
            else:
                project = Project.objects.filter(id=project.id).first()
                project.delete()
                return Response({"error": serializer.errors()})

            return Response(data={"message": "Project created successfully", "project id": project.id},
                            status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
