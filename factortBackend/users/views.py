from rest_framework.views import APIView
from rest_framework.response import Response

from consts import OK, ERR
from utils.helpers import exclude_from_dict


class RegisterView(APIView):
    def post(self, req):
        print(req.data)
        user_data = exclude_from_dict(req.data, 'profile')
        profile = req.FILES.get('profile', None)

        print(profile)

        return Response(data={'epic': 200}, status=OK)
