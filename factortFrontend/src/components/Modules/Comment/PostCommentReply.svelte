<script lang="ts">
	import {
		_Reply_On_Comment_Post,
		_Vote_PostCommentReply
	} from '../../../services/posts/commentFetchers';
	import { createEventDispatcher } from 'svelte';
	import { fly, scale, slide } from 'svelte/transition';
	import type {
		Props_PostComment,
		Props_PostCommentReply
	} from '../../../components/Layouts/Post/types';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import TextArea from '../Interactibles/Inputs/TextArea.svelte';
	import DynamicLabel from '../Misc/DynamicLabel.svelte';
	import VoteController from '../VoteController/VoteController.svelte';

	function createCommentReply() {
		if (newReplyText) {
			_Reply_On_Comment_Post(comment.post, comment.id, {
				text: newReplyText,
				replying_to: reply.user.id
			}).then((res) => {
				if (res.type === 'success') {
					dispatch('newReply', res.data);
					showReplyInput = false;
				}
			});
		}
	}

	export let reply: Props_PostCommentReply;
	export let comment: Props_PostComment;

	let showReplyInput: boolean = false;
	let newReplyText = '';

	const dispatch = createEventDispatcher();
</script>

<div transition:slide class="[ width-100 under-border ]">
	<Flexy
		useColumn={true}
		cubeClass={{
			utilClass: 'width-100 padding-block-end-1 padding-inline-end-3'
		}}
	>
		<Flexy cubeClass={{ utilClass: 'width-100' }} justify="space-between">
			<DynamicLabel
				baseFontSize={300}
				statFontSize={300}
				props={{ type: 'user', data: reply.user }}
			/>

			<p class="[ clr-text-muted fs-300 ]">{reply.date_created}</p>
		</Flexy>
		<p class="[ margin-inline-start-2 fs-350 ]">
			<span class="[ margin-inline-end-1 ]">
				{#if reply.replying_to?.id}
					<Button variant="hologram" secondaryVariant="small">@{reply.replying_to.username}</Button>
				{:else}
					<Button variant="hologram" secondaryVariant="small" workCondition={false}>@</Button>
				{/if}
			</span>
			{reply.text}
		</p>

		<Flexy cubeClass={{ utilClass: 'width-100 fs-350' }}>
			<Button
				variant={showReplyInput ? 'downvote' : 'default'}
				secondaryVariant="small"
				on:click={() => (showReplyInput = !showReplyInput)}
			>
				{showReplyInput ? 'Close reply' : 'Reply'}
			</Button>

			<VoteController
				id={reply.id}
				lastVoteAction={reply.c_vote_action}
				voteFn={_Vote_PostCommentReply}
				votes={reply.prestige}
				voteFnArgs={{ replyId: reply.id, commentId: comment.id, postId: comment.post }}
			/>
		</Flexy>

		{#if showReplyInput}
			<div class="[ width-100 ]">
				<Flexy cubeClass={{ utilClass: 'width-100' }} useColumn={true}>
					<TextArea
						bind:value={newReplyText}
						label="Reply to this comment"
						placeholder={`Reply to @${reply.user.username}`}
						cubeClass={{ utilClass: 'width-100' }}
					/>
					<Button variant="primary" secondaryVariant="small" on:click={createCommentReply}
						>Submit</Button
					>
				</Flexy>
			</div>
		{/if}
	</Flexy>
</div>
