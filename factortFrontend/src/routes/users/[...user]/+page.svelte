<script lang="ts">
	import { page } from '$app/stores';
	import UserView from '../../../components/Layouts/User/UserView.svelte';

	const [id, username] = $page.params.user.split('/');
</script>

<svelte:head>
	<title>Factort | u/{username}</title>
</svelte:head>

<UserView id={Number(id)} />
