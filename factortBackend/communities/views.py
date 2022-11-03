from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

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
        try:
            community = models.Community.objects.get(id=community_id)
            serialized_data = serializers.CommunitySerializer(
                community).data

            return Response(data=serialized_data, status=OK)
        except:
            return Response(data={'detail': 'Community does not exist'}, status=ERR)


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
                Q(is_moderator=True) | Q(is_owner=True))]
            serialized_admins = cUserSerializer(admins, many=True).data

        return Response(data={'type': 'moderator', 'data': serialized_admins}, status=OK)
