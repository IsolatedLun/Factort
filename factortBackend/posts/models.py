from django.db import models

POST_CONTENT_CHOICES = (
    ("text", "Text"),
    ("link", "Link"),
    ("video", "Video"),
    ("images", "Images"),
)

POST_VISIBILITY_CHOICES = (
    (1, "Public"),
    (2, "Unlisted"),
    (3, "Private"),
)

POST_VOTE_CHOICES = (
    (-1, 'Downvote'),
    (0, 'Neutral'),
    (1, 'Upvote'),
)


class Post(models.Model):
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    community = models.ForeignKey(
        'communities.Community', null=True, blank=True, on_delete=models.CASCADE)

    title = models.CharField(max_length=128)

    prestige = models.IntegerField(default=0)
    views = models.PositiveIntegerField(default=0)

    content = models.JSONField()

    content_type = models.CharField(
        choices=POST_CONTENT_CHOICES, max_length=16)
    visibility = models.CharField(
        choices=POST_VISIBILITY_CHOICES, max_length=16)

    date_created = models.DateTimeField(auto_now_add=True)


class VotedPost(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    user = models.ForeignKey('users.cUser', on_delete=models.CASCADE)
    action = models.IntegerField(choices=POST_VOTE_CHOICES, default=0)


class PostImage(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/images/')


class PostVideo(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    video = models.FileField(upload_to='posts/videos/')


class PostAudio(models.Model):
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    audio = models.FileField(upload_to='posts/audios/')


class CommunityPost(models.Model):
    community = models.ForeignKey(
        'communities.Community', on_delete=models.CASCADE)
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE)
