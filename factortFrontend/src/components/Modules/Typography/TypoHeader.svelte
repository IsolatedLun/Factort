<script lang="ts">
	import { combineObjectCubeClasses, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import Typography from './Typography.svelte';

	export let h: number = 2;
	export let fontHeadingSize = 600;
	export let tag = '';
	export let cubeClass = createObjectCubeClass();
	export let spacing = 1;

	let combinedCubeClass = combineObjectCubeClasses(cubeClass, {
		utilClass: ` margin-block-end-${spacing} `
	});
</script>

<Typography tag="{tag ? tag : `h${h}`}" cubeClass="{{ ...combinedCubeClass }}" fontWeight="heading" fontSize={fontHeadingSize}>
	<slot />
</Typography>