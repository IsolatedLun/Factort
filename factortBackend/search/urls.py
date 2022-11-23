from django.urls import path

from . import views

urlpatterns = [
    path('bar', views.SearchBarView.as_view(), name='POST=SearchBar'),
]
