from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from lxml.html.clean import clean_html

from consts import OK, NOT_FOUND, ERR, POSTS_PER_PAGE
from utils.functions import simple_pagination_wrapper, vote_model
from . import models
from . import serializers

from users.models import cUser
from communities.models import Community, CommunityMember


class PostsView(APIView):
    def post(self, req):
        c_user = req.user if req.user.is_authenticated else None

        print(req.data)

        data, next_page = simple_pagination_wrapper(
            models.Post,
            {'visibility': 1},
            serializers.PostPreviewSerializer,
            {'context': {'user': c_user}},
            req.data['page'],
            POSTS_PER_PAGE,
            req.data.get('sort_by', None)
        )

        return Response(data={'data': data, 'next_page': next_page}, status=OK)


class PostsSearchView(APIView):
    def post(self, req):
        c_user = req.user if req.user.is_authenticated else None

        data, next_page = simple_pagination_wrapper(
            models.Post,
            {'title__icontains': req.data['text']},
            serializers.PostPreviewSerializer,
            {'context': {'user': c_user}},
            req.data['page'],
            POSTS_PER_PAGE
        )

        return Response(data={'data': data, 'next_page': next_page}, status=OK)


class UserPostsView(APIView):
    def post(self, req, user_id: int):
        c_user = req.user if req.user.is_authenticated else None

        print(req.data)

        data, next_page = simple_pagination_wrapper(
            models.Post,
            {'user_id': user_id},
            serializers.PostPreviewSerializer,
            {'context': {'user': c_user}},
            req.data['page'],
            POSTS_PER_PAGE,
            req.data.get('sort_by', None)
        )

        return Response(data={'data': data, 'next_page': next_page}, status=OK)


class CommunityPostsView(APIView):
    def post(self, req, community_id: int):
        c_user = req.user if req.user.is_authenticated else None

        data, next_page = simple_pagination_wrapper(
            models.Post,
            {'community_id': community_id, 'visibility': 1},
            serializers.PostPreviewSerializer,
            {'context': {'user': c_user}},
            req.data['page'],
            POSTS_PER_PAGE,
            req.data.get('sort_by', None)
        )

        return Response(data={'data': data, 'next_page': next_page}, status=OK)

# ============================================
# ============================================


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
            return Response(data={'detail': 'Post not found'}, status=NOT_FOUND)


class DeletePostView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, req, post_id):
        try:
            post = models.Post.objects.get(id=post_id)
            if post.user.id == req.user.id:
                post.delete()
            else:
                raise Exception()

            return Response(status=OK)
        except Exception as e:
            return Response(data={'detail': 'Post not found'}, status=NOT_FOUND)


class UpdatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, req, post_id):
        try:
            post = models.Post.objects.get(id=post_id)
            if post.user.id == req.user.id:
                post.title = req.data['title']
                post.is_edited = True

                post.save()
            else:
                raise Exception()

            return Response(status=OK)
        except Exception as e:
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
            # If the user is not a member, then don't create a post
            if not CommunityMember.objects.filter(user_id=req.user.id).exists():
                return Response(data=f'You must be a member of this community', status=ERR)

            models.CommunityPost.objects.create(
                post_id=new_post.id, community_id=data['community_id'])

            new_post.community = Community.objects.get(
                id=data['community_id'])

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

            print(req.data)
            new_post.visibility = req.data.get('visibility', 1)
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
                return Response(data=f'Someting went terribly wrong', status=ERR)

        return Response(data=new_post.id, status=OK)


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
                new_comment, context={'user': req.user}).data
            return Response(data=serialized_data, status=OK)

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
                new_comment_reply, context={'user': req.user}).data
            return Response(data=serialized_data, status=OK)
        except Exception as e:
            return Response(status=ERR)

# =======================
# Vote views
# =======================


class VotePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id: int):
        try:
            vote_model(
                models.Post,
                {'id': post_id},
                models.VotedPost,
                {'post_id': post_id, 'user_id': req.user.id},
                req.data
            )

            return Response(status=OK)
        except Exception as e:
            return Response(status=ERR)


class VoteCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id: int, comment_id: int):
        try:
            vote_model(
                models.PostComment,
                {'post_id': post_id, 'id': comment_id},
                models.VotedComment,
                {'comment_id': comment_id, 'user_id': req.user.id},
                req.data
            )

            return Response(status=OK)
        except Exception as e:
            return Response(status=ERR)


class VoteCommentReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, post_id: int, comment_id: int, reply_id: int):
        try:
            vote_model(
                models.PostCommentReply,
                {'comment_id': comment_id, 'id': reply_id},
                models.VotedCommentReply,
                {'reply_id': reply_id, 'user_id': req.user.id},
                req.data
            )

            return Response(status=OK)
        except Exception as e:
            return Response(status=ERR)
