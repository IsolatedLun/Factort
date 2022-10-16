<script lang="ts">
	import { onMount } from 'svelte';
	import type { EventFunction } from '../../../types';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';

	onMount(() => {
		use(_this);
	});

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let tag = 'div';
	export let padding = 0;
	export let use: EventFunction<HTMLElement> = (e) => null;

	export let cubeClass = createObjectCubeClass();

	const _class = createStringCubeCSSClass(cubeClass, {
		compostClass: 'card',
		utilClass: padding > 0 ? 'padding-' + padding : ''
	});
	let _this: HTMLButtonElement;
</script>

<svelte:element
	this={tag}
	bind:this={_this}
	class={_class}
	data-variant={variant}
	data-secondary-variant={secondaryVariant}
>
	<slot />
</svelte:element>
