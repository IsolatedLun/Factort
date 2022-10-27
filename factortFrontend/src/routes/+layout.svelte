<script>
	import { layoutStore } from '../stores/layoutStore/layout-store';
	import Navbar from '../components/Layouts/Navbar.svelte';
	import { onMount } from 'svelte';
	import { _Authenticate_View } from '../services/auth/authService';
	import { globalStore } from '../stores/global';
	import { destroyTokens, getTokens } from '../utils/tokenHandler';

	onMount(() => {
		if (getTokens().access)
			_Authenticate_View().then((res) => {
				if (res.type === 'success') {
					globalStore.update((state) => ({ ...state, user: res.data, isLogged: true }));
				} else {
					destroyTokens();
				}
			});
	});
</script>

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
