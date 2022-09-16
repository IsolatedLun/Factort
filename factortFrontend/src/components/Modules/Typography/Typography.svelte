<script lang="ts">
	import { createStringCubeCSSClass, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss'

	export let fontSize: string | number = 'default';
	export let fontWeight: string | number = 'default';
	export let tag = 'p';

	export let cubeClass = createObjectCubeClass();

	let _class = createStringCubeCSSClass(cubeClass, {
		utilClass: `fw-${fontWeight} fs-${fontSize}`
	});
</script>

<svelte:element this="{tag}" class="{_class}">
	<slot />
</svelte:element>