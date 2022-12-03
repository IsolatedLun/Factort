<script lang="ts">
	import { globalStore } from '../../../../stores/global';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Button from '../../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Icon from '../../../../components/Modules/Icon/Icon.svelte';
	import {
		CREATE_MODAL_ID,
		ICON_BROKEN_LINK,
		ICON_CARET_LEFT,
		ICON_CARET_RIGHT,
		ICON_HISTORY,
		ICON_LINK,
		TOOLTIP_TIMEOUT,
		WEB_POST_URL
	} from '../../../../consts';
	import type { Props_VisitedPost } from '../../../../utils/postHistory/types';
	import Tooltip from '../../../../components/Modules/Tooltip/Tooltip.svelte';
	import { updatePostHistory } from '../../../../utils/postHistory/postHistroy';
	import HistoryTooltip from './HistoryTooltip.svelte';
	import Modal from '../../../../components/Modules/Modal/Modal.svelte';
	import { openModal } from '../../../../utils/modal/modal';

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
	export let historyModalId: string;

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

<div data-desktop data-hide={stickToSide}>
	<Flexy gap={2} cubeClass={{ utilClass: !stickToSide ? 'margin-inline-end-2' : '' }}>
		<Button
			workCondition={postsAmount > 0 && idx - 1 >= 0}
			on:click={decrementIndex}
			ariaLabel="Previous post"
		>
			<Icon>{ICON_CARET_LEFT}</Icon>
		</Button>

		<Tooltip
			workCondition={postsAmount > 1 || selectedPost?.id !== -1}
			explicitShow={recentlyChangedIndex}
		>
			{#if selectedPost && selectedPost.id !== -1}
				<Button
					workCondition={postsAmount > 0}
					ariaLabel="Open post titled {selectedPost.title}"
					to={WEB_POST_URL(selectedPost.id, selectedPost.title)}
				>
					<Icon>{ICON_LINK}</Icon>
				</Button>
			{:else}
				<Button workCondition={false}>
					<Icon>{ICON_BROKEN_LINK}</Icon>
				</Button>
			{/if}

			<div slot="tooltip">
				<HistoryTooltip
					clearHistoryFn={clearHistory}
					removeHistoryFn={removeFromHistory}
					{postsAmount}
					{idx}
					{selectedPost}
				/>
			</div>
		</Tooltip>
		<Button
			workCondition={postsAmount > 0 && idx + 1 < postsAmount}
			on:click={incrementIndex}
			ariaLabel="Next post"
		>
			<Icon>{ICON_CARET_RIGHT}</Icon>
		</Button>
	</Flexy>
</div>

<div data-hide={!stickToSide}>
	<Button on:click={() => openModal(historyModalId)} ariaLabel="Open history">
		<Icon>{ICON_HISTORY}</Icon>
	</Button>
</div>

<Modal id={historyModalId}>
	<HistoryTooltip
		clearHistoryFn={clearHistory}
		removeHistoryFn={removeFromHistory}
		{postsAmount}
		{idx}
		{selectedPost}
	/>

	<Flexy cubeClass={{ utilClass: 'margin-block-start-1' }}>
		<Button workCondition={postsAmount > 0 && idx - 1 >= 0} on:click={decrementIndex}>
			<Icon>{ICON_CARET_LEFT}</Icon>
		</Button>
		<Button workCondition={postsAmount > 0 && idx + 1 < postsAmount} on:click={incrementIndex}>
			<Icon>{ICON_CARET_RIGHT}</Icon>
		</Button>
	</Flexy>
</Modal>
