from django.urls import path

from . import views

urlpatterns = [
    path('login', views.JWTLoginView.as_view(), name='login'),
    path('authenticate', views.JWTAuthenticateView.as_view(), name='authenticate'),
]
