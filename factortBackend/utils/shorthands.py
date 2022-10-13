from users.serializers import cUserSerializer
from users.models import cUser

from django.core.exceptions import ObjectDoesNotExist


def get_user_or_none(obj: dict, _serializer=None):
    try:
        return _serializer(obj.user).data if _serializer else cUserSerializer(obj.user).data
    except:
        return None
