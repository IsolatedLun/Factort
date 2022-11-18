from django.urls import path

from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='GET=Posts'),
    path('<int:post_id>', views.PostView.as_view(), name='GET=Post'),

    # =================================
    path('create', views.CreatePostView.as_view(), name='POST=CreatePost'),
    path('vote/<int:post_id>',
         views.VotePostView.as_view(), name='POST=VotePost'),
    path('comment/<int:post_id>',
         views.CommentPostView.as_view(), name='POST=CommentOnPost'),
    path('comment/<int:post_id>/reply/<int:comment_id>',
         views.ReplyOnCommentPostView.as_view(), name='POST=ReplyOnPostComment'),
]
