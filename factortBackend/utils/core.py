from django.db.models import Model

from utils.functions import get_opengraph_meta_tags


def create_images_post(new_post: Model, post_type, files, post_image_model):
    images = []

    # =========================
    # Assertions
    # =========================
    if len(files.getlist('images[]')) == 0:
        raise Exception('There must be atleast 1 image')
    # =========================

    for x in files.getlist('images[]'):
        images.append(post_image_model.objects.create(
            image=x, post_id=new_post.id).image.url
        )

    return {'data': images, 'type': post_type}


def create_video_post(new_post: Model, post_type: str, files, post_video_model):
    # Because there is always a single video file
    video_file = None

    # =========================
    # Assertions
    # =========================
    try:
        video_file = next(files.values())
    except Exception as e:
        raise Exception('No video file found')
    # =========================

    video_model = post_video_model.objects.create(
        video=video_file, post_id=new_post.id)

    return {'data': video_model.video.url, 'type': post_type}


def create_link_post(link: str, post_type):
    og_data = get_opengraph_meta_tags(link)
    return {'data': og_data, 'type': post_type}


def create_audio_post(new_post: Model, post_type: str, files, post_audio_model):
    # Because there is always a single audio file
    audio_file = None

    # =========================
    # Assertions
    # =========================
    try:
        audio_file = next(files.values())
    except Exception as e:
        raise Exception('No audio file found')

    audio_model = post_audio_model.objects.create(
        audio=audio_file, post_id=new_post.id)
    # =========================

    return {
        'data': audio_model.audio.url, 'type': post_type}
