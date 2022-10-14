from django.db import models


class Community(models.Model):
    owner = models.ForeignKey('users.cUser', on_delete=models.CASCADE)

    name = models.CharField(max_length=64, unique=True)

    profile = models.ImageField(
        upload_to='communities/profiles/', default='profiles/def.png')
    banner = models.ImageField(
        upload_to='communities/banners/', default='banners/def.png')

    members = models.PositiveIntegerField(default=0)

    date_created = models.DateTimeField(auto_now_add=True)


class CommunityMember(models.Model):
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)

    is_moderator = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)

    date_created = models.DateTimeField(auto_now_add=True)
