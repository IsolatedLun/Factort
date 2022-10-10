from rest_framework import serializers

from . import models


class CommunitySerializer(serializers.ModelSerializer):
    posts = serializers.SerializerMethodField(method_name='get_posts')
    members = serializers.SerializerMethodField(
        method_name='get_count_members')

    def get_posts(self, obj):
        return []

    def get_count_members(self, obj):
        return models.CommunityMember.objects.filter(community_id=obj.id).count()

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
        fields = '__all__'
