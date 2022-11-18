<script lang="ts">
	import { onMount } from 'svelte';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';

	onMount(() => {
		use(_this!);
	});

	export let tag = 'div';
	export let justify = 'space-between';
	export let align = 'start';
	export let gap: string | number = 1;

	export let useColumn = false;
	export let collapseOnMobile = false;
	export let alignCenterOnMobile = false;
	export let wrapOnMobile = false;

	export let cubeClass = createObjectCubeClass();
	export let use: (_this: HTMLElement) => void = () => null;
	export let id = '';

	let _class = createStringCubeCSSClass(cubeClass, {
		utilClass: `flex align-items-${align} justify-content-${justify} gap-${gap} ${
			useColumn ? 'flex-direction-column' : ''
		}`
	});

	export let _this: HTMLElement | null = null;
</script>

<svelte:element
	this={tag}
	{id}
	class={_class}
	bind:this={_this}
	data-flex-collapse={collapseOnMobile}
	data-flex-collapse-center={alignCenterOnMobile}
	data-flex-wrap={wrapOnMobile}
	on:submit|preventDefault
>
	<slot />
</svelte:element>
