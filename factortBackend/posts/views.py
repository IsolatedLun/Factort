from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from lxml.html.clean import clean_html

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

            post.views += 1
            post.save()

            return Response(data=serialized_data, status=OK)
        except:
            return Response(data={'detail': 'Post not found'}, status=NOT_FOUND)


class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        data = req.POST
        files = req.FILES

        new_post = models.Post.objects.create(
            title=data['title'], user_id=req.user.id, content={}, content_type=data['selected'])
        post_type = data['selected']

        def _create_images_post():
            images = []

            # =========================
            # Assertions
            # =========================
            if len(images) == 0:
                raise Exception('There must be atleast 1 image')
            # =========================

            for x in files.getlist('images[]'):
                images.append(models.PostImage.objects.create(
                    image=x, post_id=new_post.id).image.url
                )

            new_post.content = {'data': images, 'type': post_type}

        def _create_text_post():
            # Received data is in html, so we clean it
            new_post.content = {'data': clean_html(
                data['content']), 'type': post_type}

        def _create_link_post():
            new_post.content = {'data': data['link'], 'type': post_type}

        def _create_video_post():
            # Because there is always a single video file
            video_file = None

            # =========================
            # Assertions
            # =========================
            try:
                video_file = next(files.values())
            except Exception as e:
                raise Exception('No video file found')
            # =========================

            video_model = models.PostVideo.objects.create(
                video=video_file, post_id=new_post.id)

            new_post.content = {
                'data': video_model.video.url, 'type': post_type}

        def _create_audio_post():
            # Because there is always a single video file
            audio_file = None

            # =========================
            # Assertions
            # =========================
            try:
                audio_file = next(files.values())
            except Exception as e:
                raise Exception('No audio file found')

            audio_model = models.PostAudio.objects.create(
                audio=audio_file, post_id=new_post.id)

            new_post.content = {
                'data': audio_model.audio.url, 'type': post_type}

        # Here, we create the dynamic string name of the function
        # retreive the function from the local symbol table and call it
        try:
            method_name = f'_create_{data["selected"]}_post'
            method = locals()[method_name]

            method()
            new_post.save()

        # Since we need to run some code before handling the exception
        # We nest a try/except block, run the code needed in the try block
        # and raise the exception again
        except:
            try:
                new_post.delete()
                raise
            except KeyError as e:  # This exception occurs when the method is not found
                return Response(data=f'Someting went terribly wrong: Selected form is invalid', status=ERR)
            except Exception as e:
                return Response(data=f'Someting went terribly wrong: {str(e)}', status=ERR)

        return Response(data=new_post.id, status=OK)
