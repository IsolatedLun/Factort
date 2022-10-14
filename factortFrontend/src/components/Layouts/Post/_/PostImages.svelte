<script lang="ts">
	import Button from '../../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import { SLIDESHOW_INTERVAL } from '../../../../consts';
	import { createEventDispatcher } from 'svelte';

	function startSlideShow() {
		clearInterval(slideShowInterval);
		selectedIdx = 0;

		slideShowInterval = setInterval(() => {
			if (selectedIdx < images.length - 1) selectedIdx++;
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

	export let images: string[] = [];
	export let selectedIdx = 0;
	export let slideshowMode = false;
	export let imageKeyEventIdx: number = 0;

	let slideShowInterval: NodeJS.Timeout;

	$: {
		if (slideshowMode) startSlideShow();
		else endSlideShow();

		if (!slideshowMode) {
			if (imageKeyEventIdx > images.length - 1) imageKeyEventIdx = 0;
			else if (imageKeyEventIdx < 0) imageKeyEventIdx = images.length - 1;

			selectedIdx = imageKeyEventIdx;
			dispatchKeyboardIdx(imageKeyEventIdx);
		}
	}

	const dispatch = createEventDispatcher();
</script>

<div class="[ post__images ] [ pos-relative ]">
	<img src={images[selectedIdx]} alt={`image ${selectedIdx + 1} out of ${images.length}`} />
	<Flexy align="center" cubeClass={{ blockClass: 'images__dots', utilClass: 'pos-absolute' }}>
		{#each images as image, i}
			<Button
				ariaLabel={`Select image ${i + 1}`}
				on:click={() => (selectedIdx = i)}
				selected={selectedIdx === i}
				variant="none"
				allowOutline={true}
				cubeClass={{ blockClass: 'dot', utilClass: 'border-radius-100vw' }}
			/>
		{/each}
	</Flexy>
</div>
