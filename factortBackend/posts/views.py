from rest_framework.views import APIView
from rest_framework.response import Response

from consts import OK, NOT_FOUND, ERR
from . import models
from . import serializers


class PostsView(APIView):
    def get(self, req):
        posts = models.Post.objects.all()
        serialized_data = serializers.PostPreviewSerializer(
            posts, many=True).data

        return Response(data=serialized_data, status=OK)


class PostView(APIView):
    def get(self, req, post_id):
        try:
            post = models.Post.objects.get(id=post_id)
            serialized_data = serializers.PostSerializer(post).data

            return Response(data=serialized_data, status=OK)
        except:
            return Response(data={'detail': 'Post not found'}, status=NOT_FOUND)
