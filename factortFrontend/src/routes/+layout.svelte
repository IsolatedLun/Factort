<script>
	import { layoutStore } from '../stores/layoutStore/layout-store';
	import Navbar from '../components/Layouts/Navbar.svelte';
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
