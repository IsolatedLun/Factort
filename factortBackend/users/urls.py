from django.urls import path

from . import views

urlpatterns = [
    path('<int:user_id>', views.UserView.as_view(), name='Get=User'),
    path('<int:user_id>/followers', views.LatestFollowersView.as_view(),
         name='GET=LatestFollowers'),

    path('<int:user_id>/toggle-follow', views.ToggleFollowingView.as_view(),
         name='Post=FollowUser'),

    # =====================================
    path('auth/register', views.RegisterView.as_view(), name='POST=Login'),
    path('auth/login', views.JWTLoginView.as_view(), name='POST=Login'),
    path('auth/authenticate', views.JWTAuthenticateView.as_view(),
         name='POST=Authenticate'),
]
