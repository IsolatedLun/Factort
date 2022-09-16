<script lang="ts">
	import type { Props_CubeCSS } from '../../../utils/cubeCss/types';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import type { Props_Profile } from './types';
	import type { EventFunction } from '../../../types';
	import { onMount } from 'svelte';

	onMount(() => {
		use(_this);
	});

	export let props: Props_Profile = {
		src: '',
		alt: 'Empty'
	};
	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let isProfile = false;
	export let use: EventFunction<HTMLImageElement> = () => null;

	const _class = createStringCubeCSSClass(cubeClass, {});

	let _this: HTMLImageElement;
</script>

<img
	bind:this={_this}
	loading="lazy"
	class={_class}
	src={props.src}
	alt={props.alt}
	data-media-error="false"
	data-profile={isProfile}
	data-small={false}
/>