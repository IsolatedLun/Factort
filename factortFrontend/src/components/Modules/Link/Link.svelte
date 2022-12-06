<script lang="ts">
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let openInNewTab: boolean = false;
	export let url: string;

	export let cubeClass = createObjectCubeClass();

	let _class = createStringCubeCSSClass(cubeClass, {});
</script>

<a
	data-variant={variant}
	data-secondary-variant={secondaryVariant}
	href={url}
	class={_class}
	target={openInNewTab ? '_blank' : '_self'}
>
	<slot />
</a>
