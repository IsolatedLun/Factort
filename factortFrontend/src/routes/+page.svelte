<script lang="ts">
	import Post from '../components/Layouts/Post/Post.svelte';
	import { _Fetch_Posts } from '../services/posts/postFetchers';

	async function fetchPosts() {
		return _Fetch_Posts();
	}
</script>

{#await fetchPosts() then data}
	{#if data.type === 'success'}
		{#each data.data as post}
			<Post props={{ ...post }} />
		{/each}
	{/if}
{/await}
