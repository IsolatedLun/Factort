<script lang="ts">
	import { createIframeElement } from '../../../../utils/misc';
	import { onMount } from 'svelte';
	import { youtubeLinkRegex } from '../../../../utils/regex/youtubeRegex';

	onMount(() => {});

	function isYoutubeLink() {
		return youtubeLinkRegex.test(videoSrc);
	}

	export let videoSrc = '';
</script>

<div class="[ post__video ]">
	{#if isYoutubeLink()}
		{@html createIframeElement(videoSrc)}
	{:else}
		<video src={videoSrc} controls>
			<track kind="captions" />
		</video>
	{/if}
</div>
