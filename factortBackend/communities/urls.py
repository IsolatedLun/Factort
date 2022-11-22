from django.urls import path

from . import views

urlpatterns = [
    path('', views.CommunitiesView.as_view(), name='GET=Community'),
    path('<int:community_id>', views.CommunityView.as_view(),
         name='GET=Comunity'),
    path('<int:community_id>/admins', views.Misc_CommunityAdminsView.as_view(),
         name='GET=CommunityAdmins'),
    path('misc', views.Misc_CommunityPreviewsView.as_view(),
         name='GET=MiscellaneousCommunities'),
    path('<int:community_id>/latest-members', views.Misc_CommunityLatestMembersView.as_view(),
         name='GET=MiscellaneousCommunities'),

    # =================================
    path('create', views.CreateCommunityView.as_view(), name='POST=Community'),
    path('<int:community_id>/toggle-join', views.ToggleCommunityJoinView.as_view(),
         name='POST=ToggleCommunityJoin'),
]
