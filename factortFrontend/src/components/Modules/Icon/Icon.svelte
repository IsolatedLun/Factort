<script lang="ts">
	import type { Props_CubeCSS } from '../../../utils/cubeCss/types';
	import { createStringCubeCSSClass, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';

	export let tag = 'span';
	export let cubeClass: Props_CubeCSS = createObjectCubeClass();

	const _class = createStringCubeCSSClass(cubeClass, {
		compostClass: 'icon'
	});
</script>

<svelte:element this={tag} class={_class} aria-hidden="true">
	<slot />
</svelte:element>