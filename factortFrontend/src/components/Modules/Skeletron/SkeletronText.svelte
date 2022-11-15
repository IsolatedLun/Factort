<script lang="ts">
	import { createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import type { SkeletronTextVariants } from './types';

	export let variant: SkeletronTextVariants = 'default';

	let _class = createStringCubeCSSClass(
		{},
		{
			compostClass: 'skeletron skeletron__text',
			utilClass: variant === 'small' ? 'fs-300' : ''
		}
	);
</script>

<div class={_class} data-variant={variant}>
	<p>
		<slot />
	</p>
</div>
