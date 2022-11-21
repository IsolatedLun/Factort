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
