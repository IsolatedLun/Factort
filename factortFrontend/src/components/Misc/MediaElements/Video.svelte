<script lang="ts">
	import type { Props_CubeCSS } from '../../../utils/cubeCss/types';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import type { Props_Media, Props_Track } from './types';
	import type { EventFunction } from '../../../types';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	onMount(() => {
		use(_this);
	});

	export let props: Props_Media = {
		src: '',
		alt: 'Empty'
	};
	export let tracks: Props_Track[] = [];
	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let use: EventFunction<HTMLVideoElement> = () => null;

	const _class = createStringCubeCSSClass(cubeClass, {});

	let _this: HTMLVideoElement;

	const dispatch = createEventDispatcher();
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
	bind:this={_this}
	loading="lazy"
	controls
	class={_class}
	src={props.src}
	alt={props.alt}
	data-media-error="false"
>
	{#each tracks as track}
		<track srclang={track.lang} href={track.url} />
	{/each}
</video>
