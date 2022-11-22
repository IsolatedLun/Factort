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
from users.models import cUser


class CommunitiesView(APIView):
    def get(self, req):
        communities = models.Community.objects.all()
        serialized_data = serializers.CommunityPreviewSerializer(
            communities, many=True).data

        return Response(data={'type': 'community', 'data': serialized_data}, status=OK)


class CommunityView(APIView):
    def get(self, req, community_id):
        c_user = req.user if req.user.is_authenticated else None

        community = models.Community.objects.get(id=community_id)
        serialized_data = serializers.CommunitySerializer(
            community, context={'user': c_user}).data

        return Response(data=serialized_data, status=OK)


class ToggleCommunityJoinView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req, community_id):
        try:
            member, created = models.CommunityMember.objects.get_or_create(
                user_id=req.user.id, community_id=community_id)

            # If the model is created then the user has joined the community
            # If created is False, then the user is leaving the community
            if not created:
                member.delete()

            return Response(status=OK)
        except Exception as e:
            return Response(status=ERR)


class CreateCommunityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, req):
        data = req.POST
        files = req.FILES

        try:
            new_community = models.Community.objects.create(
                owner=req.user, name=data['name'], profile=files['profile'], banner=files['banner'])
            owner = models.CommunityMember.objects.create(
                user=req.user, community_id=new_community.id, is_owner=True, is_moderator=True)

            return Response(data=new_community.id, status=OK)
        except IntegrityError as e:
            print(e)
            unique_variable = str(e).split(
                '.')[1] if 'UNIQUE' in str(e) else 'unknown'

            return Response(data=f'A community with the same "{unique_variable}" already exists', status=ERR)
        except Exception as e:
            return Response(data='Something went terribly wrong', status=ERR)


class Misc_CommunityPreviewsView(APIView):
    def post(self, req):
        user_id = req.data.get('id', None)

        print(req.data)

        communities = []
        serialized_communities = []

        # Get the communities that the user has joined
        if user_id:
            if not cUser.objects.filter(id=user_id).exists():
                return Response(data={'type': 'community', 'data': []}, status=OK)

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
        # Get the admins (owner/moderators) of a specific community
        if models.Community.objects.filter(id=community_id).exists():
            admins = [x.user for x in models.CommunityMember.objects.filter(
                Q(community_id=community_id) &
                (Q(is_moderator=True) | Q(is_owner=True)))]
            serialized_admins = cUserSerializer(admins, many=True).data

            return Response(data={'type': 'user', 'data': serialized_admins}, status=OK)
        return Response(status=ERR)


class Misc_CommunityLatestMembersView(APIView):
    def get(self, req, community_id):

        if models.Community.objects.filter(id=community_id).exists():
            latest_members = models.CommunityMember.objects.filter(
                community_id=community_id).order_by('-date_created')
            users = [x.user for x in latest_members[0:10]]
            serialized_members = cUserSerializer(users, many=True).data

            return Response(data={'type': 'user', 'data': serialized_members}, status=OK)
        return Response(status=ERR)
