<script>
	import { layoutStore } from '../stores/layoutStore/layout-store';
	import Navbar from '../components/Layouts/Navbar.svelte';
	import { parseMarkdown } from '../utils/markdown/markdownParser';
	import TextArea from '../components/Modules/Interactibles/Inputs/TextArea.svelte';

	let input = '';
</script>

<div
	class="[ main-layout ] [ grid ]"
	data-layout={$layoutStore.stickNavbarToSide ? 'row' : 'column'}
>
	<Navbar />
	<div class="[ main-container ] [ margin-2 ]">
		<TextArea label="" bind:value={input} />
		<article>
			{@html parseMarkdown(input, [])}
		</article>
	</div>
</div>

<style>
	@import url('../../static/posty.css');
</style>
