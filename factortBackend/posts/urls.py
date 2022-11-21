from django.urls import path

from . import views

urlpatterns = [
    path('', views.PostsView.as_view(), name='GET=Posts'),
    path('users/<int:user_id>', views.UserPostsView.as_view(), name='GET=Posts'),
    path('communities/<int:community_id>',
         views.CommunityPostsView.as_view(), name='GET=Posts'),
    path('<int:post_id>', views.PostView.as_view(), name='GET=Post'),

    # =================================

    # === Post urls ===
    path('create', views.CreatePostView.as_view(), name='POST=CreatePost'),
    path('vote/<int:post_id>',
         views.VotePostView.as_view(), name='POST=VotePost'),

    # ==== Comment Urls ===
    path('comment/<int:post_id>',
         views.CommentPostView.as_view(), name='POST=CommentOnPost'),
    path('<int:post_id>/comment/<int:comment_id>/vote',
         views.VoteCommentView.as_view(), name='POST=VotePost'),

    path('comment/<int:post_id>/reply/<int:comment_id>',
         views.ReplyOnCommentPostView.as_view(), name='POST=ReplyOnPostComment'),
]
