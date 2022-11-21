<script lang="ts">
	import { CREATE_COMMENT_REPLIES_ID } from '../../../consts';
	import type {
		Props_PostComment,
		Props_PostCommentReply
	} from '../../../components/Layouts/Post/types';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import DynamicLabel from '../Misc/DynamicLabel.svelte';
	import PostCommentReply from './PostCommentReply.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import TextArea from '../Interactibles/Inputs/TextArea.svelte';
	import { createEventDispatcher } from 'svelte';
	import {
		_Reply_On_Comment_Post,
		_Vote_PostComment
	} from '../../../services/posts/commentFetchers';
	import VoteController from '../VoteController/VoteController.svelte';

	function createCommentReply() {
		if (newCommentReplyText) {
			_Reply_On_Comment_Post(comment.post, comment.id, {
				text: newCommentReplyText,
				replying_to: null
			}).then((res) => {
				if (res.type === 'success') {
					dispatch('newReply', { commentId: comment.id, data: res.data });
					showReplyInput = false;
				}
			});
		}
	}

	function handleReplyButton(e: MouseEvent) {
		const target = e.target as HTMLButtonElement;

		showReplies = !showReplies;
		target.setAttribute('aria-expanded', String(showReplies));
	}

	function addNewReply(reply: Props_PostCommentReply) {
		comment.replies = [...comment.replies, reply];
	}

	export let comment: Props_PostComment;

	let showReplies: boolean = false;
	let showReplyInput: boolean = false;
	let commentRepliesId = CREATE_COMMENT_REPLIES_ID(comment.id);
	let newCommentReplyText: string = '';

	const dispatch = createEventDispatcher();
</script>

<Flexy
	useColumn={true}
	cubeClass={{
		blockClass: 'post__comment',
		compostClass: 'under-border',
		utilClass: 'pos-relative width-100 padding-block-end-2'
	}}
>
	<Flexy cubeClass={{ utilClass: 'width-100' }} justify="space-between">
		<DynamicLabel
			baseFontSize={300}
			statFontSize={300}
			props={{ type: 'user', data: comment.user }}
		/>

		<p class="[ clr-text-muted fs-300 ]">{comment.date_created}</p>
	</Flexy>
	<p class="[ margin-inline-start-2 ]">{comment.text}</p>

	<Flexy cubeClass={{ utilClass: 'width-100' }} justify="start">
		<Button
			use={(e) => {
				e.setAttribute('aria-controls', commentRepliesId);
				e.setAttribute('aria-expanded', 'false');
			}}
			variant={showReplies ? 'primary' : 'default'}
			secondaryVariant="small"
			workCondition={comment.replies.length > 0}
			on:click={handleReplyButton}
		>
			{showReplies ? 'Hide' : 'View'}
			{comment.replies.length} replie(s)
		</Button>

		<Button
			variant={showReplyInput ? 'downvote' : 'default'}
			secondaryVariant="small"
			on:click={() => (showReplyInput = !showReplyInput)}
			>{showReplyInput ? 'Close reply' : 'Reply'}</Button
		>

		<VoteController
			id={comment.id}
			lastVoteAction={comment.c_vote_action}
			votes={comment.prestige}
			voteFn={_Vote_PostComment}
			voteFnArgs={{ commentId: comment.id, postId: comment.post }}
		/>
	</Flexy>

	{#if showReplyInput}
		<div class="[ width-100 ]">
			<Flexy cubeClass={{ utilClass: 'width-100' }} useColumn={true}>
				<TextArea
					bind:value={newCommentReplyText}
					label="Reply to this comment"
					placeholder={`Reply to @${comment.user.username}`}
					cubeClass={{ utilClass: 'width-100' }}
				/>
				<Button variant="primary" secondaryVariant="small" on:click={createCommentReply}
					>Submit</Button
				>
			</Flexy>
		</div>
	{/if}

	<button
		class="[ comment__expand-button ] [ pos-absolute ]"
		aria-expanded={showReplies}
		aria-controls={commentRepliesId}
		data-work-condition={comment.replies.length > 0}
		on:click={() => (showReplies = !showReplies)}
	/>

	{#if showReplies}
		<Flexy
			use={(e) => (e.id = commentRepliesId)}
			useColumn={true}
			gap={2}
			cubeClass={{ utilClass: 'margin-inline-start-3 margin-block-start-1 width-100' }}
		>
			{#each comment.replies as reply}
				<PostCommentReply {comment} {reply} on:newReply={(e) => addNewReply(e.detail)} />
			{/each}
		</Flexy>
	{/if}
</Flexy>
