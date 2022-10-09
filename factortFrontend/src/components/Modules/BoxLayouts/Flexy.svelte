<script lang="ts">
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';

	export let tag = 'div';
	export let justify = 'space-between';
	export let align = 'start';
	export let useColumn = false;
	export let gap: string | number = 1;
	export let cubeClass = createObjectCubeClass();

	let _class = createStringCubeCSSClass(cubeClass, {
		utilClass: `flex align-items-${align} justify-content-${justify} gap-${gap} ${
			useColumn ? 'flex-direction-column' : ''
		}`
	});

	export let _this: HTMLElement | null = null;
</script>

<svelte:element this={tag} class={_class} bind:this={_this} on:submit|preventDefault>
	<slot />
</svelte:element>
