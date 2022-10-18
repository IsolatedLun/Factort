<script lang="ts">
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import Button from '../../Interactibles/Buttons/Button.svelte';
	import Card from '../../Card/Card.svelte';
	import { createEventDispatcher } from 'svelte';

	export let names: string[] = [];

	let selected = 0;

	const dispatch = createEventDispatcher();
</script>

<Flexy
	cubeClass={{ blockClass: 'select', utilClass: 'margin-block-end-1 width-100' }}
	align="center"
	justify="center"
>
	{#each names as name, i}
		<Button
			selected={selected === i}
			on:click={() => {
				selected = i;
				dispatch('select', { name });
			}}>{name}</Button
		>
	{/each}
</Flexy>
