<script lang="ts">
	import { downvote, upvote } from '../../../utils/voting/voting';
	import { ICON_DOWNVOTE, ICON_UPVOTE } from '../../../consts';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Icon from '../Icon/Icon.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { VoteControllerActions } from './types';

	function handleUpvote() {
		const [_votes, _action] = upvote(votes, currAction);

		votes = _votes;
		currAction = _action;
		handleVote(votes);
	}

	function handleDownvote() {
		const [_votes, _action] = downvote(votes, currAction);

		votes = _votes;
		currAction = _action;
		handleVote(votes);
	}

	function handleVote(votes: number) {
		dispatch('vote', { votes, type: currAction });
	}

	export let votes = 0;
	export let currAction: VoteControllerActions = 'neutral';

	const dispatch = createEventDispatcher();
</script>

<Flexy align="center" cubeClass={{ utilClass: 'margin-inline-start-auto margin-inline-end-2' }}>
	<Button
		on:click={handleUpvote}
		ariaLabel="Upvote post"
		variant="upvote-difference"
		secondaryVariant="small"
		selected={currAction === 'upvote'}><Icon>{ICON_UPVOTE}</Icon></Button
	>
	<p
		class={votes === 0
			? ''
			: votes > 0
			? 'clr-button-difference-upvote-color'
			: 'clr-button-difference-downvote-color'}
	>
		{votes}
	</p>
	<Button
		on:click={handleDownvote}
		ariaLabel="Downvote post"
		variant="downvote-difference"
		secondaryVariant="small"
		selected={currAction === 'downvote'}><Icon>{ICON_DOWNVOTE}</Icon></Button
	>
</Flexy>
