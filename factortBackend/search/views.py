from rest_framework.views import APIView
from rest_framework.response import Response

from consts import OK

from users.models import cUser
from users.serializers import cUserSerializer
from communities.models import Community
from communities.serializers import CommunityPreviewSerializer
from posts.models import Post
from posts.serializers import BasePostPreviewSerializer


class SearchBarView(APIView):
    def post(self, req):
        results = {'users': [], 'communities': [], 'posts': []}

        if len(req.data['query']) > 0:
            results['users'] = cUser.objects.filter(
                username__icontains=req.data['query'])[0:3]

            results['communities'] = Community.objects.filter(
                name__icontains=req.data['query'])[0:3]

            results['posts'] = Post.objects.filter(
                title__icontains=req.data['query'], visibility=1)[0:3]

            results['users'] = cUserSerializer(
                results['users'], many=True).data
            results['communities'] = CommunityPreviewSerializer(
                results['communities'], many=True).data
            results['posts'] = BasePostPreviewSerializer(
                results['posts'], many=True).data

        return Response(data=results, status=OK)
