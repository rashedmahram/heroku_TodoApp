from django.http import JsonResponse
from django.shortcuts import HttpResponse, redirect, render
from django.urls import reverse, reverse_lazy
from django.views.decorators.csrf import csrf_exempt

from .models import *


# Create your views here.
def home(request):
    if request.method =="POST":
        data = request.POST.get("task")
        if data!="":
            database = TaskModel(title=data)
            database.save()
            # print("DATA: ", database.id)
            return JsonResponse({'id': database.id, 'data': data}, status=200)
    
        # return JsonResponse({'data': database}, status=200)
    return render(request, "App__Todo/index.html", {})


def getTasks(request):
    if request.method == "GET":
        database = TaskModel.objects.all().values()
        items = []
        for i in database:
            items.append({
                'id':i['id'],
                'task': i['title'],

            })
        items.reverse()
        data = items
        return JsonResponse({'data': items}, status=200)


@csrf_exempt
def delTask(request):
    if request.method == "POST":
        taskId = request.POST.get("taskID")
        if taskId !='':
            task = TaskModel.objects.get(pk=taskId)
            task.delete()
        return render(request, "App__Todo/index.html", {})
