from django.urls import path

from . import views

urlpatterns = [
    path('', views.CommunitiesView.as_view(), name='get-communties'),
    path('<int:community_id>', views.CommunityView.as_view(),
         name='get-community-by-id'),
]
