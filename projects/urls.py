from django.urls import path
from .views import PermissionApi, ReadProjectApi, ReadSingleProjectApi, CreateProjectApi

urlpatterns = [
    path('check_permission/', PermissionApi.as_view(), name="check_permission"),
    path('read_project_api/', ReadProjectApi.as_view(), name="read_projects"),
    path('read_single_project_api/', ReadSingleProjectApi.as_view(), name="read_single_projects"),
    path('create_project_api/', CreateProjectApi.as_view(), name="create_project_api"),
]
