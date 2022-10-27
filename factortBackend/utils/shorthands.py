from users.serializers import cUserSerializer
from users.models import cUser

from django.core.exceptions import ObjectDoesNotExist
from jwt import decode
from django.conf import settings


def get_user_or_none(obj: dict, _serializer=None):
    """
        Tries to retreive the user which is the foreign key of an object\n
        If no user is found, None is returned
    """
    try:
        return _serializer(obj.user).data if _serializer else cUserSerializer(obj.user).data
    except:
        return None


def humanize_date(obj, depth=1):
    """
        Converts a date to a humanized version\n
        2022/10/3 => 1 day ago 
    """
    from django.utils.timesince import timesince

    return timesince(obj.date_created, depth=depth) + ' ago'

def decode_user_id(request_header):
    """
        gets the authorization header from a request and returns the user's id
    """
    try:
        token = request_header['Authorization'].split(' ')[1]
        return decode(jwt=str(token), key=settings.SECRET_KEY, algorithms=['HS256'])['user_id']
    except:
        return None