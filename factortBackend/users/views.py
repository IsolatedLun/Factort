from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist

from consts import OK, ERR
from utils.shorthands import decode_user_id
from . import models
from . import serializers

# =========================================
# Authetication Views
# =========================================


class RegisterView(APIView):
    def post(self, req):
        try:
            profile = req.FILES.get('profile', None)

            user = models.cUser.objects.create(
                email_address=req.data['email_address'],
                password=make_password(req.data['password']),
                username=req.data['username']
            )

            if profile:
                user.profile = profile
                user.save()

            return Response(status=OK)

        except Exception:
            return Response(data='Something went wrong.', status=ERR)


class JWTLoginView(APIView):
    def post(self, req):
        try:
            user = models.cUser.objects.get(
                email_address=req.data['email_address'])

            if not check_password(req.data['password'], user.password):
                return Response(data='Password is incorrect', status=ERR)

            refresh = RefreshToken.for_user(user)

            return Response({
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                },
                'user': serializers.cUserSerializer(user).data
            }, OK)
        except ObjectDoesNotExist as e:
            return Response(data='Invalid Email address or Password', status=ERR)
        except Exception as e:
            return Response(data='Something went wrong', status=ERR)


class JWTAuthenticateView(APIView):
    def post(self, req):
        id = decode_user_id(req.headers)

        if id is None:
            Response(status=ERR)
        else:
            user = serializers.cUserSerializer(
                models.cUser.objects.get(id=decode_user_id(req.headers))).data

            return Response(data=user, status=OK)

# =========================================
# Other Views
# =========================================


class UserView(APIView):
    def get(self, req, user_id):
        if not models.cUser.objects.filter(id=user_id).exists():
            return Response(data=user_serializer, status=OK)
        else:
            user = models.cUser.objects.get(id=user_id)
            user_serializer = serializers.cUserViewSerializer(
                user, context={'user': req.user}).data

            return Response(data=user_serializer, status=OK)


class ToggleFollowingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, user_id):
        try:
            following, created = models.UserFollower.objects.get_or_create(
                following_id=user_id, user_id=req.user.id)

            if not created:
                following.delete()

            return Response(status=OK)
        except Exception as e:
            print(e)
            return Response(status=ERR)


class LatestFollowersView(APIView):
    def get(self, req, user_id):
        followers = models.UserFollower.objects.filter(
            following_id=user_id).order_by('-date_created')[0:10]
        serialized_followers = serializers.cUserSerializer(
            [x.user for x in followers], many=True).data

        return Response(data={'type': 'user', 'data': serialized_followers}, status=OK)
