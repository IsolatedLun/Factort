from django.urls import path

from . import views

urlpatterns = [
    path('auth/login', views.JWTLoginView.as_view(), name='login'),
    path('auth/authenticate', views.JWTAuthenticateView.as_view(), name='authenticate'),

    path('<int:user_id>', views.UserView.as_view(), name='get-user')
]
