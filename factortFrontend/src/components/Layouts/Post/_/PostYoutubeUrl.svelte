<script lang="ts">
	import { createIframeElement } from '../../../../utils/misc';

	export let videoUrl: string;
</script>

<div class="[ post__iframe-container ]">
	{@html createIframeElement(videoUrl)}
</div>
