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
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ducimus officia autem quasi,
		dolorum, provident itaque a veritatis quis, rem eaque voluptatem nemo aut inventore! Minus ut
		hic eveniet impedit.
	</div>
</div>

<style>
	@import url('../../static/posty.css');
</style>
