<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../../../../components/Modules/Interactibles/Buttons/Button.svelte';

	export let selectedColor: string = '';
	export let color: string = '';
	export let preserveSize = false;

	const dispatch = createEventDispatcher();
</script>

<Button
	variant="none"
	on:click={() => {
		dispatch('select', color);

		selectedColor = color;
	}}
>
	<div
		class="[ color__cube ]"
		data-selected={selectedColor === color}
		data-preserve-size={preserveSize}
		style="background-color: {color};"
	/>
</Button>
