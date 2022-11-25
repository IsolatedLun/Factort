<script lang="ts">
	import { createInputIdWithLabel, underscoreizeLabel } from '../../../../utils/form4Svelte/utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import Flexy from '../../BoxLayouts/Flexy.svelte';

	onMount(() => {
		if (createRandomId) id = window?.crypto.randomUUID();
		else id = createInputIdWithLabel(label.toLowerCase());

		_this.id = id;
	});

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let min: number = 0;
	export let max: number = 100;

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let value = 0;
	export let id = '';
	export let label: string;
	export let name: string = underscoreizeLabel(label.toLowerCase());

	export let createRandomId = true;
	export let showLabel = true;
	export let unit: string = '';

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative'
	});

	let _this: HTMLInputElement;
</script>

<div class={_class}>
	<Flexy align="center">
		<label for={id} class={`[ ${!showLabel ? 'visually-hidden' : ''} ] [ display-inline-block ]`}
			>{label} <span class="[ fs-350 clr-text-muted ]">{unit ? `(in ${unit})` : ''}</span></label
		>

		<p class="[ clr-text-muted fs-300 ]">{value}{unit}</p>
	</Flexy>
	<Flexy align="center">
		<p class="[ clr-text-muted ]">{min}{unit}</p>
		<input
			bind:value
			on:input
			bind:this={_this}
			{id}
			{name}
			{min}
			{max}
			class="[ input ] [  width-100 ]"
			type="range"
			data-variant={variant}
			data-secondary-variant={secondaryVariant}
			data-input-valid="true"
		/>
		<p class="[ clr-text-muted ]">{max}{unit}</p>
	</Flexy>
</div>
