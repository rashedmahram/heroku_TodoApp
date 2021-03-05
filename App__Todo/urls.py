from django.urls import path

from .views import *

app_name = "App__Todo"
urlpatterns = [
    path('/', home,name='home'),
    path('add/', home,name='home'),
    path('add/Tasks/', getTasks,name="Tasks"),
    path('add/del/', delTask,name="delete"),
]
