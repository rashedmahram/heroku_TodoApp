from django.db import models
from django.urls import reverse_lazy


# Create your models here.
class TaskModel(models.Model):
    title=models.CharField( max_length=50)
    
    def __str__(self):
        return self.title
