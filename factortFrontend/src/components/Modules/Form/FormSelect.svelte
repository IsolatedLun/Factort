<script lang="ts">
	import type { Store_FormHook } from '../../../stores/formStore/types';
	import { getContext } from 'svelte';
	import { CONTEXT_KEY } from './consts';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';

	export let formHook: Store_FormHook = getContext(CONTEXT_KEY);
	export let names: string[] = [];
</script>

<Flexy
	cubeClass={{ blockClass: 'select', utilClass: 'margin-block-end-2' }}
	align="center"
	justify="center"
>
	{#each names as name, i}
		<Button selected={$formHook.currentIndex === i} on:click={() => formHook.changeIndex(i)}
			>{name}</Button
		>
	{/each}
</Flexy>
