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

    # ===========
    is_following = serializers.SerializerMethodField(
        method_name='get_is_following')

    def get_posts(self, obj):
        from posts.models import Post
        from posts.serializers import PostPreviewSerializer

        user_posts = Post.objects.filter(
            user_id=obj.id).order_by('-date_created')
        return PostPreviewSerializer(user_posts, context={'user': obj}, many=True).data

    def get_is_following(self, obj):
        if(self.context['user']):
            return self.context['user'].id == obj.id
        return False

    class Meta:
        model = models.cUser
        exclude = ['password', 'email',
                   'email_address', 'first_name', 'last_name', 'groups', 'user_permissions']
