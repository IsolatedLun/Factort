from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class cUserManager(BaseUserManager):
    def create_user(self, email_address, password, **others):
        email_address = self.normalize_email(email_address)
        user = self.model(email_address=email_address, **others)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email_address, password, **others):
        others.setdefault('is_active', True)
        others.setdefault('is_superuser', True)
        others.setdefault('is_staff', True)

        return self.create_user(email_address, password, **others)


class cUser(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    email_address = models.EmailField(max_length=128, unique=True)
    password = models.CharField(max_length=128)

    prestige = models.IntegerField(default=0)

    profile = models.ImageField(
        upload_to='profiles/', default='default/profile.png')

    date_created = models.DateTimeField(auto_now_add=True)

    # User public privacy settings
    show_liked_posts = models.BooleanField(default=False)
    show_joined_communities = models.BooleanField(default=False)

    USERNAME_FIELD = 'email_address'
    REQUIRED_FIELDS = []

    objects = cUserManager()


class UserFollower(models.Model):
    user = models.ForeignKey(
        'cUser', on_delete=models.CASCADE, related_name='follower')
    following = models.ForeignKey(
        'cUser', on_delete=models.CASCADE, related_name='following')

    date_created = models.DateTimeField(auto_now_add=True)
