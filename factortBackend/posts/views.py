from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from lxml.html.clean import clean_html

from consts import OK, NOT_FOUND, ERR
from . import models
from . import serializers

from users.models import cUser


class PostsView(APIView):
    def get(self, req):
        c_user = req.user if req.user.is_authenticated else None

        posts = models.Post.objects.all()
        serialized_data = serializers.PostPreviewSerializer(
            posts, context={'user': c_user}, many=True).data

        return Response(data=serialized_data, status=OK)


class PostView(APIView):

    def get(self, req, post_id):
        try:
            c_user = req.user if req.user.is_authenticated else None

            post = models.Post.objects.get(id=post_id)
            serialized_data = serializers.PostSerializer(
                post, context={'user': c_user}).data

            post.views += 1
            post.save()

            return Response(data=serialized_data, status=OK)
        except Exception as e:
            print(e)
            return Response(data={'detail': 'Post not found'}, status=NOT_FOUND)


class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        data = req.POST
        files = req.FILES

        new_post = models.Post.objects.create(
            title=data['title'], user_id=req.user.id, content={}, content_type=data['selected'])
        post_type = data['selected']

        if(data['community_id'] != '-1'):
            models.CommunityPost.objects.create(
                post_id=new_post.id, community_id=data['community_id'])

        def _create_images_post():
            images = []

            # =========================
            # Assertions
            # =========================
            if len(files.getlist('images[]')) == 0:
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


class VotePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id: int):
        try:
            post = models.Post.objects.get(id=post_id)
            voted_post, created = models.VotedPost.objects.get_or_create(
                post_id=post_id, user_id=req.user.id)

            post.prestige = req.data['votes']
            voted_post.action = req.data['action']

            post.save()
            voted_post.save()

            return Response(status=OK)
        except Exception as e:
            return Response(status=ERR)


class CommentPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id: int):
        try:
            new_comment = models.PostComment.objects.create(
                user_id=req.user.id,
                post_id=post_id,
                text=req.data['text']
            )

            serialized_data = serializers.PostCommentSerializer(
                new_comment).data
            return Response(data=serialized_data, status=OK)

        except Exception as e:
            return Response(status=ERR)


class VoteCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id: int, comment_id: int):
        try:
            comment = models.PostComment.objects.get(id=comment_id)
            voted_comment, created = models.VotedComment.objects.get_or_create(
                comment_id=comment_id, user_id=req.user.id)

            comment.prestige = req.data['votes']
            voted_comment.action = req.data['action']

            comment.save()
            voted_comment.save()

            return Response(status=OK)
        except Exception as e:
            return Response(status=ERR)


class ReplyOnCommentPostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id, comment_id):
        try:
            new_comment_reply = models.PostCommentReply.objects.create(
                user_id=req.user.id,
                post_id=post_id,
                text=req.data['text'],
                comment_id=comment_id
            )

            if(req.data['replying_to']):
                new_comment_reply.replying_to = cUser.objects.get(
                    id=req.data['replying_to'])

            new_comment_reply.save()

            serialized_data = serializers.PostCommentReplySerializer(
                new_comment_reply).data
            return Response(data=serialized_data, status=OK)
        except Exception as e:
            return Response(status=ERR)
