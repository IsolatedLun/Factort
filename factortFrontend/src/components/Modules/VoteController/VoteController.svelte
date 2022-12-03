<script lang="ts">
	import { downvote, upvote } from '../../../utils/voting/voting';
	import { ICON_DOWNVOTE, ICON_UPVOTE } from '../../../consts';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Icon from '../Icon/Icon.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { _Vote_Post } from '../../../services/posts/postFetchers';
	import { E_VoteControllerActions } from './types';
	import { globalStore } from '../../../stores/global';
	import type { Success_OR_Error__Response } from '../../../services/types';
	import type { KeyValue } from '../../../types';
	import { formatNumber } from '../../../utils/misc';

	onMount(() => {
		currAction = lastVoteAction ?? 0;
	});

	function handleUpvote() {
		const [_votes, _action] = upvote(votes, currAction);

		votes = _votes;
		currAction = _action;

		handleVote(votes);
		voteFn({
			votes,
			action: currAction,
			...voteFnArgs
		});
	}

	function handleDownvote() {
		const [_votes, _action] = downvote(votes, currAction);

		votes = _votes;
		currAction = _action;

		handleVote(votes);
		voteFn({
			votes,
			action: currAction,
			...voteFnArgs
		});
	}

	function handleVote(votes: number) {
		lastVoteAction = null;

		dispatch('vote', { votes, type: currAction });
	}

	export let id: number;
	export let voteFn: (...args: any) => Promise<Success_OR_Error__Response<number>>;
	export let voteFnArgs: KeyValue<string | number>;
	export let votes: number;
	export let currAction: E_VoteControllerActions = E_VoteControllerActions.NEUTRAL;
	export let lastVoteAction: E_VoteControllerActions | null;

	const dispatch = createEventDispatcher();
</script>

<Flexy align="center" cubeClass={{ utilClass: 'margin-inline-start-auto margin-inline-end-2' }}>
	<Button
		on:click={handleUpvote}
		ariaLabel="Upvote post"
		variant="upvote-difference"
		secondaryVariant="small"
		selected={currAction === E_VoteControllerActions.UPVOTE ||
			lastVoteAction === E_VoteControllerActions.UPVOTE}
		workCondition={$globalStore.userStore.isLogged}><Icon>{ICON_UPVOTE}</Icon></Button
	>
	<p
		class={votes === 0
			? ''
			: votes > 0
			? 'clr-button-difference-upvote-color'
			: 'clr-button-difference-downvote-color'}
	>
		{formatNumber(votes)}
	</p>
	<Button
		on:click={handleDownvote}
		ariaLabel="Downvote post"
		variant="downvote-difference"
		secondaryVariant="small"
		selected={currAction === E_VoteControllerActions.DOWNVOTE ||
			lastVoteAction === E_VoteControllerActions.DOWNVOTE}
		workCondition={$globalStore.userStore.isLogged}><Icon>{ICON_DOWNVOTE}</Icon></Button
	>
</Flexy>
