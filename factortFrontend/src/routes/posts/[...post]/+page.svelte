<script lang="ts">
	import { page } from '$app/stores';
	import PostView from '../../../components/Layouts/Post/PostView.svelte';

	const [id, title] = $page.params.post.split('/');
</script>

<PostView {id} {title} />
