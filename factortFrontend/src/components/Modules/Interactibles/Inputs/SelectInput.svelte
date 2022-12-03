<script lang="ts">
	import { createInputIdWithLabel, underscoreizeLabel } from '../../../../utils/form4Svelte/utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import type { Props_SelectInputOption } from './types';
	import type { Numeric } from '../../../../types';

	onMount(() => {
		if (createRandomId) id = window?.crypto.randomUUID();
		else id = createInputIdWithLabel(label.toLowerCase());

		_this.id = id;
		value = typeof options === 'string' ? options[0] : (options[0] as any).value;
	});

	function handleInput(e: Event) {
		const target = e.target as HTMLSelectElement;

		value = target.value;
		dispatch('change', value);
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let options: Props_SelectInputOption<any>[];
	export let id = '';
	export let label: string;
	export let value: Numeric = '';
	export let name: string = underscoreizeLabel(label.toLowerCase());

	export let createRandomId = true;
	export let showLabel = true;

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative fs-450'
	});

	let _this: HTMLSelectElement;

	const dispatch = createEventDispatcher();
</script>

<div class={_class}>
	<Flexy justify="start" align="center">
		<label for={id} class={`[ ${!showLabel ? 'visually-hidden' : ''} ] [ display-inline-block ]`}
			>{label}:
		</label>
		<select
			{name}
			{id}
			bind:this={_this}
			class="[ input ]"
			data-variant="default"
			data-valid-input="true"
			on:input={handleInput}
		>
			{#each options as option}
				{#if typeof option === 'string'}
					<option value={option}>{option}</option>
				{:else}
					<option value={option.value}>{option.name}</option>
				{/if}
			{/each}
		</select>
	</Flexy>
</div>
