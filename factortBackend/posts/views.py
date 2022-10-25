from rest_framework.views import APIView
from rest_framework.response import Response

from consts import OK, NOT_FOUND, ERR
from . import models
from . import serializers


class PostsView(APIView):
    def get(sself, req):
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


class CreatePostView(APIView):
    def post(self, req):
        data = req.POST
        files = req.FILES

        new_post = models.Post.objects.create(
            title=data['title'], user_id=1, content={}, content_type=data['selected'])
        post_type = data['selected']

        def _create_images_post():
            images = []

            for x in files.getlist('images[]'):
                images.append(models.PostImage.objects.create(
                    image=x, post_id=new_post.id).image.url
                )

            new_post.content = {'data': images, 'type': post_type}

        def _create_text_post():
            new_post.content = {'data': data['content'], 'type': post_type}

        def _create_link_post():
            new_post.content = {'data': data['link'], 'type': post_type}

        def _create_video_post():
            # Because there is always a single video file
            print(files)
            video_file = next(files.values())
            video = models.PostVideo.objects.create(
                video=video_file, post_id=new_post.id)

            new_post.content = {'data': video.video.url, 'type': post_type}

        # Here, we create the dynamic string name of the function
        # retreive the function from the local symbol table and call it
        method_name = f'_create_{data["selected"]}_post'
        method = locals()[method_name]

        method()
        new_post.save()

        return Response(data='BRUH', status=OK)
