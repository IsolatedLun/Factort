<script lang="ts">
	import { page } from '$app/stores';
	import CommunityView from '../../../components/Layouts/Community/CommunityView.svelte';

	const [id, communityName] = $page.params.community.split('/');
</script>

<svelte:head>
	<title>Factort | g/{communityName}</title>
</svelte:head>

<CommunityView id={Number(id)} />
