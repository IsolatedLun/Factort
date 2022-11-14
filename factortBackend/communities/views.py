from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.db import IntegrityError
from rest_framework.permissions import AllowAny, IsAuthenticated

from consts import OK, ERR
from utils.helpers import exclude_from_dict

from . import models
from . import serializers
from users.serializers import cUserSerializer


class CommunitiesView(APIView):
    def get(self, req):
        communities = models.Community.objects.all()
        serialized_data = serializers.CommunityPreviewSerializer(
            communities, many=True).data

        return Response(data={'type': 'community', 'data': serialized_data}, status=OK)


class CommunityView(APIView):
    def get(self, req, community_id):

        community = models.Community.objects.get(id=community_id)
        serialized_data = serializers.CommunitySerializer(
            community, context={'user': req.user}).data

        return Response(data=serialized_data, status=OK)


class CreateCommunityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        data = req.POST
        files = req.FILES

        try:
            new_community = models.Community.objects.create(
                owner=req.user, name=data['name'], profile=files['profile'], banner=files['banner'])
            owner = models.CommunityMember.objects.create(
                user=req.user, is_owner=True, is_moderator=True)

            return Response(data=new_community.id, status=OK)
        except IntegrityError as e:
            unique_variable = str(e).split(
                '.')[1] if 'UNIQUE' in str(e) else 'unknown'

            return Response(data=f'A community with the same "{unique_variable}" already exists', status=ERR)
        except Exception as e:
            return Response(data='Something went terribly wrong', status=ERR)


class Misc_CommunityPreviewsView(APIView):
    def post(self, req):
        user_id = req.data.get('id', None)

        communities = []
        serialized_communities = []

        # Get the communities that the user has joined
        if user_id:
            communities = [
                x.community for x in models.CommunityMember.objects.filter(user_id=user_id)]
            serialized_communities = serializers.CommunityPreviewSerializer(
                communities, many=True).data
        else:
            communities = models.Community.objects.all()
            serialized_communities = serializers.CommunityPreviewSerializer(
                communities, many=True).data

        return Response(data={'type': 'community', 'data': serialized_communities}, status=OK)


class Misc_CommunityAdminsView(APIView):
    def get(self, req, community_id):
        admins = []
        serialized_admins = []

        # Get the admins (owner/moderators) of a specific community
        if community_id:
            admins = [x.user for x in models.CommunityMember.objects.filter(
                Q(community_id=community_id) &
                (Q(is_moderator=True) | Q(is_owner=True)))]
            serialized_admins = cUserSerializer(admins, many=True).data

        return Response(data={'type': 'moderator', 'data': serialized_admins}, status=OK)
