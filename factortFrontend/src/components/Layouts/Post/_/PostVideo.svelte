<script lang="ts">
	import { createIframeElement } from '../../../../utils/misc';
	import { youtubeLinkRegex } from '../../../../utils/regex/youtubeRegex';

	function isYoutubeLink() {
		return youtubeLinkRegex.test(videoSrc);
	}

	export let videoSrc = '';
	export let isThirdParty = false;
</script>

<div class="[ post__video ]">
	{#if !isThirdParty}
		<video src={videoSrc} controls>
			<track kind="captions" />
		</video>
	{:else if isYoutubeLink()}
		{@html createIframeElement(videoSrc)}
	{/if}
</div>
