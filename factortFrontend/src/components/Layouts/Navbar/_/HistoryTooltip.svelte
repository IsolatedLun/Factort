<script lang="ts">
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Button from '../../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import { WEB_POST_URL } from '../../../../consts';
	import type { Props_VisitedPost } from '../../../../utils/postHistory/types';

	export let selectedPost: Props_VisitedPost | null;
	export let clearHistoryFn: () => void;
	export let removeHistoryFn: () => void;
	export let postsAmount: number;
	export let idx: number;
</script>

<div class="[ navbar__history-tooltip ]">
	<p class="[ fs-450 text-center margin-block-end-1 ]" data-typo-underline="true">Selected Post:</p>
	<p class="[ text-ellipsis-2 ]">{selectedPost?.title}</p>

	<Flexy cubeClass={{ utilClass: 'margin-block-start-2 fs-300 clr-text-muted' }}>
		<p>[{idx + 1}/{postsAmount}]</p>
		<p>{selectedPost?.date_visited}</p>
	</Flexy>
	<Flexy justify="space-between" cubeClass={{ utilClass: 'margin-block-start-2 fs-300' }} gap={3}>
		<Button variant="downvote" secondaryVariant="small" on:click={clearHistoryFn}
			>Clear history</Button
		>

		<Flexy>
			<Button variant="primary" secondaryVariant="small" on:click={removeHistoryFn}>Delete</Button>
			{#if selectedPost && selectedPost.id !== -1}
				<Button
					variant="primary"
					secondaryVariant="small"
					ariaLabel="Open post titled {selectedPost.title}"
					to={WEB_POST_URL(selectedPost.id, selectedPost.title)}>Open</Button
				>
			{/if}
		</Flexy>
	</Flexy>
</div>
