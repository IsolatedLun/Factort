<script lang="ts">
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import type { Success_OR_Error__Response } from 'src/services/types';
	import { onMount } from 'svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import Post from '../Post/Post.svelte';
	import type { Props_PreviewPost } from '../Post/types';
	import Card from '../../../components/Modules/Card/Card.svelte';

	export let cubeClass = createObjectCubeClass();

	// we can either pass in the posts, or fetch it with a custom function
	export let posts: Props_PreviewPost[] = [];
	export let fetchFn: Promise<Success_OR_Error__Response<Props_PreviewPost[]>> | null | any = null;
	export let title = '';
	export let isInThread = false;

	let _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'feed-container',
		utilClass: 'grid gap-2'
	});
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
		{#if fetchFn}
			{#await fetchFn() then res}
				{#if res.type === 'success'}
					<Flexy useColumn={true} gap={2}>
						{#if isInThread}
							<Post props={{ ...res.data }} {isInThread} />
						{:else if res.data.length > 0}
							{#each res.data as post}
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
		{:else if posts.length > 0}
			<Flexy useColumn={true} gap={2}>
				{#each posts as post}
					<Post props={{ ...post }} />
				{/each}
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
	</section>

	<section class="[ width-100 ]">
		<h2 class="[ visually-hidden ]">Miscellaneuos</h2>
		<slot name="misc" />
	</section>
</div>
