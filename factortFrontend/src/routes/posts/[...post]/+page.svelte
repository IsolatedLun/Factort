<script>
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';

	const [id, title] = $page.params.post.split('/');
</script>

<h1>{title}</h1>
