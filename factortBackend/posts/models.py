from django.db import models

POST_CONTENT_CHOICES = (
    ("text", "text"),
    ("link", "link"),
    ("video", "video"),
    ("images", "images"),
)

POST_VISIBILITY_CHOICES = (
    ("public", "public"),
    ("unlisted", "unlisted"),
    ("private", "private"),
)


class Post(models.Model):
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    community = models.ForeignKey(
        'communities.Community', on_delete=models.CASCADE)

    title = models.CharField(max_length=128)

    prestige = models.IntegerField(default=0)
    views = models.PositiveIntegerField(default=0)

    content = models.JSONField()

    content_type = models.CharField(
        choices=POST_CONTENT_CHOICES, max_length=16)
    visibility = models.CharField(
        choices=POST_VISIBILITY_CHOICES, max_length=16)

    date_created = models.DateTimeField(auto_now=True)


class CommunityPost(models.Model):
    community = models.ForeignKey(
        'communities.Community', on_delete=models.CASCADE)
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE)
