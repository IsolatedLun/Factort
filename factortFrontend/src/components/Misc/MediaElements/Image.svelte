<script lang="ts">
	import type { Props_CubeCSS } from '../../../utils/cubeCss/types';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import type { Props_Media } from './types';
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

		if (target.naturalWidth <= 750 && target.naturalHeight <= 1000 && autoContain) {
			containImage = true;
		}
	}

	export let props: Props_Media = {
		src: '',
		alt: 'Empty'
	};
	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let isProfile = false;
	export let use: EventFunction<HTMLImageElement> = () => null;
	export let containImage = false;
	export let autoContain = false;

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
	data-small={containImage}
/>
