from django.contrib import admin

from . import models

admin.site.register(models.Post)
admin.site.register(models.VotedPost)
admin.site.register(models.CommunityPost)

admin.site.register(models.PostComment)
admin.site.register(models.PostCommentReply)
