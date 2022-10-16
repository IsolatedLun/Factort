<script lang="ts">
	import type { Store_FormHook } from '../../../stores/formStore/types';
	import { getContext } from 'svelte';
	import { CONTEXT_KEY } from './consts';
	import Flexy from '../BoxLayouts/Flexy.svelte';

	export let formHook: Store_FormHook<any> = getContext(CONTEXT_KEY);
	export let names: string[] = [];
</script>

<Flexy align="center" justify="center">
	{#each names as name, i}
		<button on:click={() => formHook.changeIndex(i)}>{name}</button>
	{/each}
</Flexy>
