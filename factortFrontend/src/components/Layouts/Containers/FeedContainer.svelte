<script lang="ts">
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import type { Success_OR_Error__Response } from 'src/services/types';
	import { onMount } from 'svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import Post from '../Post/Post.svelte';
	import type { Props_PreviewPost } from '../Post/types';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import SkeletronPost from '../../../components/Modules/Skeletron/components/SkeletronPost.svelte';
	import type { PaginatedResponse, PostFetcherFn } from 'src/services/posts/types';
	import type { KeyValue } from 'src/types';

	onMount(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.25
		};

		observer = new IntersectionObserver(handleIntersection, options);
		observer.observe(_div);
	});

	function handleIntersection(
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				_fetch();
				break;
			}
		}
	}

	// This function is a wrapper for the fetchFn
	// It is called everytime the observer detects an intersection (at the bottom of the posts)
	// It receives the next_page_number and posts, if the next_page_number is null
	// Then we have reached the end and don't send a request again
	async function _fetch() {
		if (end) return;

		const res = (await fetchFn({ ...fetchFnArgs, page })) as Success_OR_Error__Response<
			PaginatedResponse<Props_PreviewPost>
		>;

		if (res.type === 'success') {
			isSuccess = true;

			_posts = [..._posts, ...res.data.data];

			if (res.data.next_page) page = res.data.next_page;
			else end = true;
		}
	}

	export let cubeClass = createObjectCubeClass();

	export let fetchFn: PostFetcherFn;
	export let fetchFnArgs: KeyValue<string | number> = {};
	export let title = '';
	export let isInThread = false;

	let _posts: Props_PreviewPost[] = [];
	let _div: HTMLElement;
	let _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'feed-container',
		utilClass: 'grid gap-2'
	});

	let page = 1;
	let observer;
	let end: boolean = false;
	let isSuccess: boolean = false;
</script>

<div class={_class} data-grid-collapse="true">
	<section class="[ width-100 ]">
		<header class="[ width-100 ]">
			<slot name="feed" />
		</header>

		{#if title}
			<TypoHeader>{title}</TypoHeader>
		{:else}
			<h2 class="[ visually-hidden ]">{isInThread ? 'Post' : 'Posts'}</h2>
		{/if}
		{#await _fetch()}
			<Flexy gap={2} useColumn={true}>
				<SkeletronPost />
			</Flexy>
		{:then _}
			{#if isSuccess}
				<Flexy useColumn={true} gap={2}>
					{#if isInThread && _posts.length === 1}
						<div class="[ width-100 ]">
							<Post props={{ ..._posts[0] }} {isInThread} />
							<slot name="under-post" />
						</div>
					{:else if _posts.length > 0}
						{#each _posts as post}
							<Post props={{ ...post }} />
						{/each}
					{/if}
				</Flexy>
			{:else}
				<Card
					cubeClass={{ utilClass: 'text-center margin-block-2' }}
					variant="error-difference"
					padding={2}
				>
					<p class="[ fs-500 clr-text-error ]">No posts found</p>
				</Card>
			{/if}
		{/await}

		{#if !end}
			<div
				id="post-intersection"
				class="[ margin-block-start-2 ]"
				bind:this={_div}
				aria-hidden="true"
			>
				<SkeletronPost />
			</div>
		{/if}
	</section>

	<section class="[ width-100 ]">
		<h2 class="[ visually-hidden ]">Miscellaneuos</h2>
		{page}
		<slot name="misc" />
	</section>
</div>
