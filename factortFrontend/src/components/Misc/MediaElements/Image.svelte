<script lang="ts">
	import type { Props_CubeCSS } from '../../../utils/cubeCss/types';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import type { Props_Profile } from './types';
	import type { EventFunction } from '../../../types';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	onMount(() => {
		use(_this);
		_this.addEventListener('load', handleImageLoad);
	});

	onDestroy(() => {
		_this.removeEventListener('load', handleImageLoad);
	});

	function handleImageLoad(e: Event) {
		const target = e.target as HTMLImageElement;
		dispatch('dimensions', { x: target.naturalWidth, y: target.naturalHeight });
	}

	export let props: Props_Profile = {
		src: '',
		alt: 'Empty'
	};
	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let isProfile = false;
	export let use: EventFunction<HTMLImageElement> = () => null;

	const _class = createStringCubeCSSClass(cubeClass, {});

	let _this: HTMLImageElement;

	const dispatch = createEventDispatcher();
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
