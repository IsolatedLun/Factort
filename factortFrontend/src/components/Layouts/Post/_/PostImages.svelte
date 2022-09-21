<script lang="ts">
	import Button from '../../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import type { Props_PostImage } from './types';
	import { SLIDESHOW_INTERVAL } from '../../../../consts';
	import { createEventDispatcher } from 'svelte';

	function startSlideShow() {
		clearInterval(slideShowInterval);
		selectedIdx = 1;

		slideShowInterval = setInterval(() => {
			if (selectedIdx < images.length) selectedIdx++;
			else endSlideShow();
		}, SLIDESHOW_INTERVAL);
	}

	function endSlideShow() {
		clearInterval(slideShowInterval);
	}

	function dispatchKeyboardIdx(value: number | null) {
		dispatch('keyChange', {
			value
		});
	}

	export let images: Props_PostImage[] = [];
	export let selectedIdx = 1;
	export let slideshowMode = false;
	export let imageKeyEventIdx: number = 1;

	let slideShowInterval: NodeJS.Timeout;

	$: {
		if (slideshowMode) startSlideShow();
		else endSlideShow();

		if (imageKeyEventIdx > images.length) imageKeyEventIdx = 1;
		else if (imageKeyEventIdx < 1) imageKeyEventIdx = images.length;

		selectedIdx = imageKeyEventIdx;
		dispatchKeyboardIdx(imageKeyEventIdx);
	}

	const dispatch = createEventDispatcher();
</script>

<div class="[ post__images ] [ pos-relative ]">
	<img src={images[selectedIdx - 1].image} alt={`${selectedIdx}/${images.length}`} />
	<Flexy align="center" cubeClass={{ blockClass: 'images__dots', utilClass: 'pos-absolute' }}>
		{#each images as image, i}
			<Button
				ariaLabel={`Select image ${i + 1}`}
				on:click={() => (selectedIdx = image.id)}
				selected={selectedIdx === image.id}
				variant="none"
				allowOutline={true}
				cubeClass={{ blockClass: 'dot', utilClass: 'border-radius-100vw' }}
			/>
		{/each}
	</Flexy>
</div>
