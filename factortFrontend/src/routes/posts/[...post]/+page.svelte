<script>
	import { page } from '$app/stores';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Post from '../../../components/Layouts/Post/Post.svelte';
	import { _Fetch_Post } from '../../../services/posts/postFetchers';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';

	function fetchPost() {
		return _Fetch_Post(Number(id));
	}

	const [id, title] = $page.params.post.split('/');
</script>

<svelte:head>
	<title>Factort | {title}</title>
</svelte:head>

<Flexy useColumn={true} gap={2}>
	{#await fetchPost() then res}
		{#if res.type === 'success'}
			<Post props={res.data} isInThread={true} />
		{/if}
	{/await}

	<div>
		<TypoHeader>0 comment(s)</TypoHeader>
	</div>
</Flexy>
