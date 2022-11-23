from rest_framework.views import APIView
from rest_framework.response import Response

from consts import OK

from users.models import cUser
from users.serializers import cUserSerializer
from communities.models import Community
from communities.serializers import CommunityPreviewSerializer


class SearchBarView(APIView):
    def post(self, req):
        results = {'users': [], 'communities': []}

        if len(req.data['query']) > 0:
            results['users'] = cUser.objects.filter(
                username__icontains=req.data['query'])[0:3]

            results['communities'] = Community.objects.filter(
                name__icontains=req.data['query'])[0:3]

            results['users'] = cUserSerializer(
                results['users'], many=True).data
            results['communities'] = CommunityPreviewSerializer(
                results['communities'], many=True).data

        return Response(data=results, status=OK)
