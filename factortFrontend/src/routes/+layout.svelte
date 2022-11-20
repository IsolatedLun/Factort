<script>
	import { layoutStore } from '../stores/layoutStore/layout-store';
	import Navbar from '../components/Layouts/Navbar/Navbar.svelte';
	import { onMount } from 'svelte';
	import { _Authenticate_View } from '../services/auth/authService';
	import { globalStore } from '../stores/global';
	import { destroyTokens, getTokens } from '../utils/tokenHandler';
	import { getPostsFromHistory } from '../utils/postHistory/postHistroy';

	// Set all beginning values/stores here
	onMount(() => {
		// Authentication
		if (getTokens().access)
			_Authenticate_View().then((res) => {
				if (res.type === 'success') {
					globalStore.update((state) => ({
						...state,
						userStore: {
							user: res.data,
							isLogged: true
						}
					}));
				} else {
					destroyTokens();
				}
			});

		// Global
		const posts = getPostsFromHistory();
		globalStore.update((state) => ({ ...state, visitedStore: { visitedPosts: posts, idx: 0 } }));
	});
</script>

<svelte:head>
	<meta
		name="description"
		content="Factort is a open-source social network where you can interact with the whole word, and find your communities"
	/>
</svelte:head>

<div
	class="[ main-layout ] [ grid ]"
	data-layout={$layoutStore.stickNavbarToSide ? 'row' : 'column'}
>
	<Navbar />
	<div class="[ main-container ] [ margin-2 ]">
		<slot />
	</div>
</div>

<style>
	@import url('../../static/posty.css');
</style>
