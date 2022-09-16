from django.db import models


class Project(models.Model):
    state_choices = (("Propose", "Propose"), ("Open", "Open"), ("Closed", "Closed"))
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=50, choices=state_choices)
    date = models.DateField()

    def __str__(self):
        return self.name


class Access(models.Model):
    permit_choices = (("Read", "Read"), ("Create", "Create"), ("Update", "Update"), ("Delete", "Delete"))
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user_id = models.IntegerField()
    permit = models.CharField(max_length=50, choices=permit_choices)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['project', 'user_id', "permit"], name='unique')
        ]