from django.core.paginator import Paginator
from django.db.models import Model

import requests
from bs4 import BeautifulSoup

from typing import TypeVar

T = TypeVar('T')


def simple_pagination_wrapper(
    table: Model,
    table_kwargs: dict,
    serializer: any,
    serializer_kwargs: dict,
    curr_page: int,
    per_page: int,
    sort_by: str = None
) -> tuple[T, int]:
    """
        A pagination wrapper for all models.\n
        Returns a serialized queryset with the next page index
    """
    queryset = None

    if(table_kwargs):
        queryset = table.objects.filter(**table_kwargs)
    else:
        queryset = table.objects.all()

    if sort_by:
        queryset = queryset.order_by(sort_by)

    paginated_queryset = Paginator(queryset, per_page).get_page(curr_page)
    serialized_queryset = serializer(
        paginated_queryset, many=True, **serializer_kwargs).data

    next_page = paginated_queryset.next_page_number(
    ) if paginated_queryset.has_next() else None

    return (serialized_queryset, next_page)


def vote_model(
    votable_table: any,
    table_kwargs: dict,
    vote_table: any,
    vote_table_kwargs: dict,
    req_data: dict
):
    votable_model = votable_table.objects.get(**table_kwargs)
    voted_model, created = vote_table.objects.get_or_create(
        **vote_table_kwargs)

    # 2 => Downvote
    # 1 => Upvote
    # 0 => Neutral

    difference = votable_model.user.prestige + req_data['votes'] * 10
    votable_model.user.prestige = difference

    votable_model.prestige = req_data['votes']
    voted_model.action = req_data['action']

    votable_model.save()
    voted_model.save()
    votable_model.user.save()


def get_opengraph_meta_tags(url: str):
    try:
        req = requests.get(url)
        bs4 = BeautifulSoup(req.text, 'lxml')
        meta_tags = bs4.select(
            '*[property*="og"]:not([property="og:image:width"], \
                [property="og:image:height"], [property="og:type"])'
        )

        out = {'url': url}
        for x in meta_tags:
            _property = '_'.join(x.get('property', '').split(':')[1::])
            out[_property] = x['content']

        return out
    except Exception as e:
        print(e)
        return {
            'url': url,
            'site_name': None,
            'description': None,
            'image': None
        }
