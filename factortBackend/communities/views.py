from rest_framework.views import APIView
from rest_framework.response import Response

from consts import OK, ERR
from utils.helpers import exclude_from_dict

from . import models
from . import serializers

class CommunitiesView(APIView):
    def get(self, req):
        communities = models.Community.objects.all()
        serialized_data = serializers.CommunityPreviewSerializer(
            communities, many=True).data

        return Response(data=serialized_data, status=OK)

class CommunityView(APIView):
    def get(self, req, community_id):
        try:
            community = models.Community.objects.get(id=community_id)
            serialized_data = serializers.CommunityPreviewSerializer(
                community).data

            return Response(data=serialized_data, status=OK)
        except:
            return Response(data={'detail': 'Community does not exist'}, status=ERR)
