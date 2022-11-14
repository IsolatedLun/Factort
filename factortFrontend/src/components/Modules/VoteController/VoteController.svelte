<script lang="ts">
	import { downvote, upvote } from '../../../utils/voting/voting';
	import { ICON_DOWNVOTE, ICON_UPVOTE } from '../../../consts';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Icon from '../Icon/Icon.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { _Vote_Post } from '../../../services/posts/postFetchers';
	import { PostVoteTypes } from '../../../components/Layouts/Post/types';

	onMount(() => {
		currAction = lastVoteAction ?? 0;
	});

	function handleUpvote() {
		const [_votes, _action] = upvote(votes, currAction);

		votes = _votes;
		currAction = _action;

		handleVote(votes);
		_Vote_Post(postId, {
			votes,
			action: currAction
		});
	}

	function handleDownvote() {
		const [_votes, _action] = downvote(votes, currAction);

		votes = _votes;
		currAction = _action;

		handleVote(votes);
		_Vote_Post(postId, {
			votes,
			action: currAction
		});
	}

	function handleVote(votes: number) {
		lastVoteAction = null;

		dispatch('vote', { votes, type: currAction });
	}

	export let postId: number;
	export let votes: number;
	export let currAction: PostVoteTypes = PostVoteTypes.NEUTRAL;
	export let lastVoteAction: PostVoteTypes | null;

	const dispatch = createEventDispatcher();
</script>

<Flexy align="center" cubeClass={{ utilClass: 'margin-inline-start-auto margin-inline-end-2' }}>
	<Button
		on:click={handleUpvote}
		ariaLabel="Upvote post"
		variant="upvote-difference"
		secondaryVariant="small"
		selected={currAction === PostVoteTypes.UPVOTE || lastVoteAction === PostVoteTypes.UPVOTE}
		><Icon>{ICON_UPVOTE}</Icon></Button
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
		selected={currAction === PostVoteTypes.DOWNVOTE || lastVoteAction === PostVoteTypes.DOWNVOTE}
		><Icon>{ICON_DOWNVOTE}</Icon></Button
	>
</Flexy>
