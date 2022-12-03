<script lang="ts">
	import { _Fetch_Post } from '../../../services/posts/postFetchers';
	import { _Comment_Post } from '../../../services/posts/commentFetchers';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Miscellaneuos from '../../../components/Layouts/Miscellaneous/Miscellaneuos.svelte';
	import { addPostToHistory } from '../../../utils/postHistory/postHistroy';
	import { onMount } from 'svelte';
	import { globalStore } from '../../../stores/global';
	import type { Success_OR_Error__Response } from 'src/services/types';
	import type { Props_Post, Props_PostComment } from './types';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import PostComment from '../../../components/Modules/Comment/PostComment.svelte';
	import TextArea from '../../../components/Modules/Interactibles/Inputs/TextArea.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import type { Props__Dispatch_CommentReply } from 'src/components/Modules/Comment/types';
	import Post from './Post.svelte';
	import SkeletronPost from '../../../components/Modules/Skeletron/components/SkeletronPost.svelte';

	onMount(() => {
		post = fetchPost();

		post.then((res) => {
			if (res.type === 'success') {
				isSuccess = true;
				comments = res.data.comments;
			} else isSuccess = false;
		});

		const posts = addPostToHistory({ id, title, date_visited: new Date().toDateString() });
		globalStore.update((state) => ({ ...state, visitedStore: { visitedPosts: posts, idx: 0 } }));
	});

	function fetchPost() {
		return _Fetch_Post(Number(id));
	}

	function createComment() {
		if (newCommentText.length > 0) {
			_Comment_Post(id, newCommentText).then((res) => {
				if (res.type === 'success') {
					comments = [...comments, res.data];
				}

				newCommentText = '';
			});
		}
	}

	function appendReply(reply: Props__Dispatch_CommentReply) {
		const commentIndex = comments.findIndex((x) => x.id === reply.commentId);

		if (commentIndex > -1) {
			const currComment = comments[commentIndex];
			currComment.replies = [...currComment.replies, reply.data];

			comments = [...comments];
		}
	}

	export let id: string;
	export let title: string;

	let post: Promise<Success_OR_Error__Response<Props_Post>>;

	// We extract the comments from the post data and put it in this variable,
	// so that we can append newly created comments or replies easily...
	let comments: Props_PostComment[] = [];
	let newCommentText: string;

	let isSuccess = false;
</script>

<svelte:head>
	<title>Factort | {title}</title>
</svelte:head>

<div class="[ feed-container ] [ grid gap-2 width-100 ]" data-grid-collapse="true">
	<section class="[ width-100 margin-block-start-3 ]">
		<div>
			{#await fetchPost()}
				<SkeletronPost />
			{:then res}
				{#if res.type === 'success'}
					<Post props={{ ...res.data }} isInThread={true} />
				{:else}
					<div class="[ grid place-items-center margin-block-auto ]">
						<Card padding={2} variant="error-difference">404: Post does not exist</Card>
					</div>
				{/if}
			{/await}
		</div>
		<!-- Test for spacing issues for the submit button, if there are issues, then set useColumn to
			 true -->
		<div data-work-condition={isSuccess}>
			<Flexy
				useColumn={false}
				align="end"
				cubeClass={{
					blockClass: 'post-add-comment',
					utilClass: 'margin-block-end-1 margin-block-start-5'
				}}
			>
				<TextArea
					bind:value={newCommentText}
					label="Add comment"
					resize="vertical"
					placeholder="Add comment"
				/>
				<Button variant="primary" on:click={createComment}>Submit</Button>
			</Flexy>
			<Card cubeClass={{ utilClass: 'padding-inline-3 padding-block-1' }} variant="dark">
				<TypoHeader spacingPosition="end" spacing={1} underline={true}
					>{comments.length} Comment(s)</TypoHeader
				>

				<Flexy useColumn={true} gap={3}>
					{#each comments as comment}
						<PostComment {comment} on:newReply={(e) => appendReply(e.detail)} />
					{/each}
				</Flexy>
			</Card>
		</div>
	</section>

	<Miscellaneuos withFooter={true} />
</div>
