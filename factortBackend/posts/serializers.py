from rest_framework import serializers
from utils.shorthands import humanize_date
from utils.shorthands import get_model_or_default, get_user_or_none

from users import models as userModels

from . import models


class PostUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModels.cUser
        exclude = ['password', 'email_address', 'email', 'last_name', 'first_name',
                   'groups', 'user_permissions', 'last_login']


class PostPreviewSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    community = serializers.SerializerMethodField(method_name='get_community')
    user = serializers.SerializerMethodField(method_name='get_user')
    comments = serializers.SerializerMethodField(
        method_name='get_count_comments')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    c_vote_action = serializers.SerializerMethodField(
        method_name='get_c_vote_action')

    def get_c_vote_action(self, obj):
        if self.context['user']:
            voted_post, created = models.VotedPost.objects.get_or_create(
                post_id=obj.id, user_id=self.context['user'].id)

            return voted_post.action
        return 0

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def get_count_comments(self, obj):
        return models.PostComment.objects.filter(post_id=obj.id).count()

    def get_content(self, obj):
        return obj.content

    def get_community(self, obj):
        from communities.serializers import CommunityPreviewSerializer

        if(obj.community):
            return {'type': 'community', 'community': CommunityPreviewSerializer(obj.community).data}
        return {'type': 'user', 'community': None}

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.Post
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    user = serializers.SerializerMethodField(method_name='get_user')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    comments = serializers.SerializerMethodField(method_name='get_comments')

    c_vote_action = serializers.SerializerMethodField(
        method_name='get_c_vote_action')

    def get_c_vote_action(self, obj):
        if self.context['user']:
            voted_post = get_model_or_default(
                models.VotedPost, None, post_id=obj.id, user_id=self.context['user'].id)

            return voted_post.action if voted_post else 0
        return 0

    def get_comments(self, obj):
        comments = models.PostComment.objects.filter(
            post_id=obj.id)

        return PostCommentSerializer(comments, context=self.context, many=True).data

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

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
        if self.context['user']:
            voted_comment = get_model_or_default(
                models.VotedComment, None, comment_id=obj.id, user_id=self.context['user'].id)

            return voted_comment.action if voted_comment else 0
        return 0

    def get_replies(self, obj):
        replies = models.PostCommentReply.objects.filter(
            post_id=obj.post.id, comment_id=obj.id)

        return PostCommentReplySerializer(replies, many=True).data

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

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def get_replying_to(self, obj):
        return PostUserSerializer(obj.replying_to).data

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.PostCommentReply
        fields = '__all__'
