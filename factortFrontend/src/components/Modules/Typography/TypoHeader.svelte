<script lang="ts">
	import { combineObjectCubeClasses, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import Typography from './Typography.svelte';

	export let h: number = 2;
	export let fontHeadingSize = 600;
	export let tag = '';
	export let underline = false;
	export let cubeClass = createObjectCubeClass();
	export let spacing = 1;
	export let spacingPosition: 'start' | 'end' = 'end';

	let combinedCubeClass = combineObjectCubeClasses(cubeClass, {
		utilClass: ` margin-block-${spacingPosition}-${spacing} `
	});
</script>

<Typography
	tag={tag ? tag : `h${h}`}
	cubeClass={{ ...combinedCubeClass }}
	fontWeight="heading"
	fontSize={fontHeadingSize}
	use={(e) => e.setAttribute('data-typo-underline', String(underline))}
>
	<slot />
</Typography>
