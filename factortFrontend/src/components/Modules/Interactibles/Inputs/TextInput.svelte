<script lang="ts">
	import { onMount } from 'svelte';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import Icon from '../../Icon/Icon.svelte';
	import type { InputTypes } from './types';

	onMount(() => {
		id = window.crypto.randomUUID();
	})

	function setType(node: HTMLInputElement) {
		node.type = type;
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass({
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative'
	});

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let value = '';
	export let id = '';
	export let type: InputTypes = 'text';
	export let label: string;

	export let showLabel = false;
	export let endIcon = '';
	const _class = createStringCubeCSSClass(cubeClass, {});
</script>

<div class={_class}>
	<label
		for={id}
		class={`[ ${!showLabel ? 'visually-hidden' : ''} ] [ margin-block-end-1 display-inline-block ]`}
		>{label}</label
	>
	<input
		use:setType
		bind:value
		{id}
		class="[ input ] [  width-100 ]"
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		{placeholder}
	/>
	{#if endIcon}
		<Icon cubeClass={{ blockClass: 'container__end-icon', utilClass: 'pos-absolute clr-input-border' }}>
			{ endIcon }
		</Icon>
	{/if}
	<slot />
</div>