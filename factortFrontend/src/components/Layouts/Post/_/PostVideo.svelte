<script lang="ts">
	import Video from '../../../../components/Misc/MediaElements/Video.svelte';
	import { BACKEND_ROOT_URL } from '../../../../consts';

	export let videoSrc = '';
	export let isThirdParty = false;
</script>

<div class="[ post__video ]">
	{#if !isThirdParty}
		<Video props={{ src: BACKEND_ROOT_URL + videoSrc, alt: 'Post video' }} />
	{:else}
		<p>This video url is not supported.</p>
	{/if}
</div>
