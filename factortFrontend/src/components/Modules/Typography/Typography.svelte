<script lang="ts">
	import { onMount } from 'svelte';
	import { createStringCubeCSSClass, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';

	onMount(() => {
		use(_this);
	});

	export let fontSize: string | number = 'default';
	export let fontWeight: string | number = 'default';
	export let spacingBottom: string | number = 0;
	export let spacingTop: string | number = 0;
	export let tag = 'p';
	export let lineClamp = -1;

	export let use: (e: HTMLElement) => void = (e) => null;

	export let cubeClass = createObjectCubeClass();

	let _class = createStringCubeCSSClass(cubeClass, {
		utilClass: `fw-${fontWeight} fs-${fontSize} margin-block-end-${spacingBottom} 
			margin-block-start-${spacingTop} text-ellipsis-${lineClamp}`
	});

	let _this: HTMLElement;
</script>

<svelte:element this={tag} bind:this={_this} class={_class}>
	<slot />
</svelte:element>
