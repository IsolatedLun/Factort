from rest_framework import serializers
from utils.shorthands import humanize_date
from utils.shorthands import get_model_or_default, get_user_or_none

from users import models as userModels

from . import models


class PostPreviewSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    community = serializers.SerializerMethodField(method_name='get_community')
    user = serializers.SerializerMethodField(method_name='get_user')
    comments = serializers.SerializerMethodField(
        method_name='get_count_comments')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    vote_action = serializers.SerializerMethodField(
        method_name='get_vote_action')

    def get_vote_action(self, obj):
        voted_post = get_model_or_default(
            models.VotedPost, post_id=obj.id, user_id=self.context.id)

        if voted_post:
            return voted_post.action
        return 0

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def get_count_comments(self, obj):
        return ""

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
    vote_action = serializers.SerializerMethodField(
        method_name='get_vote_action')

    def get_vote_action(self, obj):
        voted_post = get_model_or_default(
            models.VotedPost, post_id=obj.id, user_id=self.context.id)

        if voted_post:
            return voted_post.action
        return 0

    def get_user(self, obj):
        return get_user_or_none(obj, PostUserSerializer)

    def get_content(self, obj):
        return obj.content

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.Post
        fields = '__all__'


class PostUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = userModels.cUser
        exclude = ['password', 'email_address',
                   'groups', 'user_permissions', 'last_login']
