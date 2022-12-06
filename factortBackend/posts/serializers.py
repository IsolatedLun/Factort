from rest_framework import serializers
from utils.shorthands import humanize_date, get_model_or_default

from users import models as userModels
from users.utils import get_user_or_none

from . import models


def _get_c_vote_action(voted_table, self, obj):
    """
        Gets the vote state of the current user on the voted model
    """
    if self.context.get('user', False):
        voted_post = get_model_or_default(
            voted_table, None, post_id=obj.id, user_id=self.context['user'].id)

        return voted_post.action if voted_post else 0
    return 0


def _get_count_comments(self, obj):
    comment_count = models.PostComment.objects.filter(
        post_id=obj.id).count()
    comment_replies_count = models.PostCommentReply.objects.filter(
        post_id=obj.id).count()

    return comment_count + comment_replies_count

# ===============================
# ===============================


class PostUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModels.cUser
        exclude = ['password', 'email_address', 'email', 'last_name', 'first_name',
                   'groups', 'user_permissions', 'last_login']


class BasePostPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ['title', 'id']


class PostPreviewSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    community = serializers.SerializerMethodField(method_name='get_community')
    user = serializers.SerializerMethodField(method_name='get_user')
    comment_count = serializers.SerializerMethodField(
        method_name='get_count_comments')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    c_vote_action = serializers.SerializerMethodField(
        method_name='get_c_vote_action')

    def get_c_vote_action(self, obj):
        return _get_c_vote_action(models.VotedPost, self, obj)

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def get_count_comments(self, obj):
        return _get_count_comments(self, obj)

    def get_content(self, obj):
        return obj.content

    def get_community(self, obj):
        from communities.serializers import CommunityPreviewSerializer

        if(obj.community):
            return {'type': 'community', 'data': CommunityPreviewSerializer(obj.community).data}
        return {'type': 'user', 'data': None}

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.Post
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    user = serializers.SerializerMethodField(method_name='get_user')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    community = serializers.SerializerMethodField(method_name='get_community')
    comments = serializers.SerializerMethodField(method_name='get_comments')
    comment_count = serializers.SerializerMethodField(
        method_name='get_count_comments')

    c_vote_action = serializers.SerializerMethodField(
        method_name='get_c_vote_action')

    def get_c_vote_action(self, obj):
        return _get_c_vote_action(models.VotedPost, self, obj)

    def get_comments(self, obj):
        comments = models.PostComment.objects.filter(
            post_id=obj.id)

        return PostCommentSerializer(comments, context=self.context, many=True).data

    def get_count_comments(self, obj):
        return _get_count_comments(self, obj)

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def get_community(self, obj):
        from communities.serializers import CommunityPreviewSerializer

        if(obj.community):
            return {'type': 'community', 'data': CommunityPreviewSerializer(obj.community).data}
        return {'type': 'user', 'data': None}

    def get_content(self, obj):
        return obj.content

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.Post
        fields = '__all__'


# ====================
# ====================
class PostCommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField(method_name='get_replies')
    user = serializers.SerializerMethodField(method_name='get_user')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    c_vote_action = serializers.SerializerMethodField(
        method_name='get_c_vote_action')

    def get_c_vote_action(self, obj):
        return _get_c_vote_action(models.VotedComment, self, obj)

    def get_replies(self, obj):
        replies = models.PostCommentReply.objects.filter(
            post_id=obj.post.id, comment_id=obj.id)

        return PostCommentReplySerializer(replies, context=self.context, many=True).data

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.PostComment
        fields = '__all__'


class PostCommentReplySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(method_name='get_user')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    replying_to = serializers.SerializerMethodField(
        method_name='get_replying_to')

    c_vote_action = serializers.SerializerMethodField(
        method_name='get_c_vote_action')

    def get_c_vote_action(self, obj):
        return _get_c_vote_action(models.VotedCommentReply, self, obj)

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def get_replying_to(self, obj):
        return PostUserSerializer(obj.replying_to).data

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.PostCommentReply
        fields = '__all__'
