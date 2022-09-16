from django.db import models


class Permissions(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name


class Users(models.Model):
    access = models.ManyToManyField(Permissions)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Project(models.Model):
    state_choices = (("Propose", "Propose"), ("Open", "Open"), ("Closed", "Closed"))
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=50, choices=state_choices)
    date = models.DateField()

    def __str__(self):
        return self.name


class Access(models.Model):
    permit_choices = (("Read", "Read"), ("Create", "Create"), ("Update", "Update"), ("Delete", "Delete"))
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project')
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='user', null=True)
    permit = models.CharField(max_length=50, choices=permit_choices)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['project', 'user', "permit"], name='unique')
        ]

