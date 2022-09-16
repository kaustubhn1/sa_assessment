from .models import Project, Access, Users
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    access = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Users
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class AccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Access
        fields = '__all__'
