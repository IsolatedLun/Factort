"""
factortBackend URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/posts/', include('posts.urls')),
    path('api/communities/', include('communities.urls')),

    path('api/users/', include('users.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
