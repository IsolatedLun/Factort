from jwt import decode
from django.conf import settings


def get_model_or_default(table, default=None, **kwargs):
    """
        Tries to get an object, if it doesn't exist then returns the default
    """

    try:
        return table.objects.get(**kwargs)
    except:
        return default


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
