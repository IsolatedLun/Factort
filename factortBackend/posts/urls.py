from django.urls import path

from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='get-posts'),
    path('<int:post_id>', views.PostView.as_view(), name='get-post-by-id'),

    path('create', views.CreatePostView.as_view(), name='create-post'),
]
