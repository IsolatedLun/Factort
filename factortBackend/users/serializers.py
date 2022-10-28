from rest_framework import serializers

from . import models


class cUserSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format="%b %d, %Y")

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

    class Meta:
        model = models.cUser
        exclude = ['password', 'email',
                   'email_address', 'first_name', 'last_name', 'groups', 'user_permissions']


class cUserViewSerializer(serializers.ModelSerializer):
    date_created = serializers.DateTimeField(format="%b %d, %Y")
    posts = serializers.SerializerMethodField(method_name='get_posts')

    def get_posts(self, obj):
        from posts.models import Post
        from posts.serializers import PostPreviewSerializer

        user_posts = Post.objects.filter(user_id=obj.id)
        return PostPreviewSerializer(user_posts, many=True).data

    class Meta:
        model = models.cUser
        exclude = ['password', 'email',
                   'email_address', 'first_name', 'last_name', 'groups', 'user_permissions']
