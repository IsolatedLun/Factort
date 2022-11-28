from django.core.paginator import Paginator

from typing import TypeVar

T = TypeVar('T')


def simple_pagination_wrapper(
    table: any,
    table_kwargs: dict,
    serializer: any,
    serializer_kwargs: dict,
    curr_page: int,
    per_page: int
) -> tuple[T, int]:
    queryset = None

    if(table_kwargs):
        queryset = table.objects.filter(**table_kwargs)
    else:
        queryset = table.objects.all()

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

    if req_data['action'] == 2:
        votable_model.user.prestige -= 10
    elif req_data['action'] == 1:
        votable_model.user.prestige += 10

    votable_model.prestige = req_data['votes']
    voted_model.action = req_data['action']

    votable_model.save()
    voted_model.save()
    votable_model.user.save()
