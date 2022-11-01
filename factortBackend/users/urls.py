from django.urls import path

from . import views

urlpatterns = [
    path('auth/login', views.JWTLoginView.as_view(), name='POST=Login'),
    path('auth/authenticate', views.JWTAuthenticateView.as_view(),
         name='POST=Authenticate'),

    path('<int:user_id>', views.UserView.as_view(), name='Get=User')
]
