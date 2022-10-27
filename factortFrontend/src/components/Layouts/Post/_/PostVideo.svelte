<script lang="ts">
	import { BACKEND_ROOT_URL } from '../../../../consts';
	import { createIframeElement } from '../../../../utils/misc';
	import { youtubeLinkRegex } from '../../../../utils/regex/all';

	function isYoutubeLink() {
		return youtubeLinkRegex.test(videoSrc);
	}

	export let videoSrc = '';
	export let isThirdParty = false;
</script>

<div class="[ post__video ]">
	{#if !isThirdParty}
		<video src={BACKEND_ROOT_URL + videoSrc} controls>
			<track kind="captions" />
		</video>
	{:else if isYoutubeLink()}
		{@html createIframeElement(videoSrc)}
	{/if}
</div>
