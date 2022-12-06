from rest_framework import serializers

from . import models
from posts.models import CommunityPost
from posts.serializers import PostPreviewSerializer
from utils.shorthands import get_model_or_default, humanize_date


class CommunitySerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField(method_name='get_posts')
    date_created = serializers.SerializerMethodField(method_name='format_date')
    members = serializers.SerializerMethodField(
        method_name='get_count_members')

    c_has_joined_community = serializers.SerializerMethodField(
        method_name='get_c_has_joined_community')

    def get_posts(self, obj):
        posts = [x.post for x in CommunityPost.objects.filter(
            community_id=obj.id)]
        return PostPreviewSerializer(posts, context={'user': self.context['user']}, many=True).data

    def get_count_members(self, obj):
        return models.CommunityMember.objects.filter(community_id=obj.id).count()

    def get_c_has_joined_community(self, obj):
        if self.context['user']:
            has_joined = get_model_or_default(
                models.CommunityMember, False, community_id=obj.id, user_id=self.context['user'].id)

            return True if has_joined != False else False
        return False

    def format_date(self, obj):
        return humanize_date(obj)

    class Meta:
        model = models.Community
        fields = '__all__'


class CommunityPreviewSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField(
        method_name='get_count_members')

    def get_count_members(self, obj):
        return models.CommunityMember.objects.filter(community_id=obj.id).count()

    class Meta:
        model = models.Community
        exclude = ['owner', 'banner']
