from django.urls import path

from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='GET=Posts'),
    path('<int:post_id>', views.PostView.as_view(), name='GET=Post'),

    path('create', views.CreatePostView.as_view(), name='POST=CreatePost'),
]
