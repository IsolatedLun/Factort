from users.serializers import cUserSerializer
from users.models import cUser

from django.core.exceptions import ObjectDoesNotExist


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
