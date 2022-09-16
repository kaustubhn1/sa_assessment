from django.contrib import admin
from .models import Project, Access, Users, Permissions

admin.site.register(Project)
admin.site.register(Access)
admin.site.register(Users)
admin.site.register(Permissions)


