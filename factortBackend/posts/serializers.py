from rest_framework import serializers

from . import models

from json import loads as json_loads


class PostPreviewSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    community = serializers.SerializerMethodField(method_name='get_community')
    user = serializers.SerializerMethodField(method_name='get_user')
    comments = serializers.SerializerMethodField(
        method_name='get_count_comments')
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def get_user(self, obj):
        return {}

    def get_count_comments(self, obj):
        return {}

    def get_content(self, obj):
        return {'type': obj.content_type, 'data': json_loads(obj.content)}

    def get_community(self, obj):
        from communities.serializers import CommunityPreviewSerializer

        if(obj.community):
            return {'type': 'community', 'community': CommunityPreviewSerializer(obj.community).data}
        return {'type': 'user', 'community': None}

    class Meta:
        model = models.Post
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField(method_name='get_content')
    user = serializers.SerializerMethodField(method_name='get_user')
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def get_user(self, obj):
        return {}

    def get_content(self, obj):
        return {'type': obj.content_type, 'data': json_loads(obj.content)}

    class Meta:
        model = models.Post
        fields = '__all__'
