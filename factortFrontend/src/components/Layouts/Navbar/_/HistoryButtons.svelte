<script lang="ts">
	import { globalStore } from '../../../../stores/global';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Button from '../../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Icon from '../../../../components/Modules/Icon/Icon.svelte';
	import {
		ICON_BROKEN_LINK,
		ICON_CARET_LEFT,
		ICON_CARET_RIGHT,
		ICON_LINK,
		TOOLTIP_TIMEOUT,
		WEB_POST_URL
	} from '../../../../consts';
	import type { Props_VisitedPost } from '../../../../utils/postHistory/types';
	import Tooltip from '../../../../components/Modules/Tooltip/Tooltip.svelte';
	import { updatePostHistory } from '../../../../utils/postHistory/postHistroy';

	function incrementIndex() {
		globalStore.update((state) => ({
			...state,
			visitedStore: {
				...state.visitedStore,
				idx: idx <= postsAmount ? idx + 1 : 0
			}
		}));

		toggleIndexChange();
	}

	function decrementIndex() {
		globalStore.update((state) => ({
			...state,
			visitedStore: {
				...state.visitedStore,
				idx: idx - 1 >= 0 ? idx - 1 : postsAmount
			}
		}));

		toggleIndexChange();
	}

	// Clears the entire post history and sets a default empty post
	function clearHistory() {
		globalStore.update((state) => ({
			...state,
			visitedStore: {
				...state.visitedStore,
				visitedPosts: [{ id: -1, title: 'No posts', date_visited: 'No date' }],
				idx: 0
			}
		}));

		updatePostHistory($globalStore.visitedStore.visitedPosts);
	}

	// Removes a post from the history
	// If the post being removed is the last one, we add a default empty post
	function removeFromHistory() {
		globalStore.update((state) => ({
			...state,
			visitedStore: {
				...state.visitedStore,
				visitedPosts:
					postsAmount > 1
						? [...state.visitedStore.visitedPosts.filter((x) => x.id !== selectedPost!.id)]
						: [{ id: -1, title: 'No posts', date_visited: 'No date' }],
				idx: idx > 0 ? idx - 1 : 0
			}
		}));

		updatePostHistory($globalStore.visitedStore.visitedPosts);
	}

	function toggleIndexChange() {
		clearTimeout(indexChangeTimeout);

		recentlyChangedIndex = true;
		indexChangeTimeout = setTimeout(() => (recentlyChangedIndex = false), TOOLTIP_TIMEOUT);
	}

	export let stickToSide: boolean;

	let idx = $globalStore.visitedStore.idx;
	let postsAmount = $globalStore.visitedStore.visitedPosts.length;
	let selectedPost: Props_VisitedPost | null = null;
	let recentlyChangedIndex = false;
	let indexChangeTimeout: NodeJS.Timeout;

	globalStore.subscribe((state) => {
		idx = state.visitedStore.idx;
		postsAmount = state.visitedStore.visitedPosts.length;

		if (postsAmount > 0) selectedPost = $globalStore.visitedStore.visitedPosts[idx];
		else selectedPost = null;
	});
</script>

<div data-desktop>
	<Flexy
		useColumn={stickToSide}
		gap={2}
		cubeClass={{ utilClass: !stickToSide ? 'margin-inline-end-2' : '' }}
	>
		<Button workCondition={postsAmount > 0 && idx - 1 >= 0} on:click={decrementIndex}>
			<Icon>{ICON_CARET_LEFT}</Icon>
		</Button>

		<Tooltip
			workCondition={postsAmount > 1 || selectedPost?.id !== -1}
			explicitShow={recentlyChangedIndex}
		>
			{#if selectedPost && selectedPost.id !== -1}
				<Button
					workCondition={postsAmount > 0}
					to={WEB_POST_URL(selectedPost.id, selectedPost.title)}
				>
					<Icon>{ICON_LINK}</Icon>
				</Button>
			{:else}
				<Button workCondition={false}>
					<Icon>{ICON_BROKEN_LINK}</Icon>
				</Button>
			{/if}

			<div class="[ navbar__history-tooltip ]" slot="tooltip">
				<p class="[ fs-450 text-center margin-block-end-1 ]" data-typo-underline="true">
					Selected Post:
				</p>
				<p>{selectedPost?.title}</p>

				<Flexy cubeClass={{ utilClass: 'margin-block-start-2 fs-300 clr-text-muted' }}>
					<p>[{idx + 1}/{postsAmount}]</p>
					<p>{selectedPost?.date_visited}</p>
				</Flexy>
				<Flexy
					justify="space-between"
					cubeClass={{ utilClass: 'margin-block-start-2 fs-300' }}
					gap={3}
				>
					<Button variant="downvote" secondaryVariant="small" on:click={clearHistory}
						>Clear history</Button
					>

					<Flexy>
						<Button variant="primary" secondaryVariant="small" on:click={removeFromHistory}
							>Delete</Button
						>
						{#if selectedPost && selectedPost.id !== -1}
							<Button
								variant="primary"
								secondaryVariant="small"
								to={WEB_POST_URL(selectedPost.id, selectedPost.title)}>Open</Button
							>
						{/if}
					</Flexy>
				</Flexy>
			</div>
		</Tooltip>
		<Button workCondition={postsAmount > 0 && idx + 1 < postsAmount} on:click={incrementIndex}>
			<Icon>{ICON_CARET_RIGHT}</Icon>
		</Button>
	</Flexy>
</div>
