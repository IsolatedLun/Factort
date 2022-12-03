<script lang="ts">
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import type { TagVariants } from './types';

	export let cubeClass = createObjectCubeClass();
	export let variant: TagVariants = 'default';

	let _class = createStringCubeCSSClass(cubeClass, {
		compostClass: 'tag',
		utilClass: 'fs-350 border-radius-cubed'
	});
</script>

<p class={_class} data-variant={variant}>
	<slot />
</p>
