<script lang="ts">
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import Post from '../Post/Post.svelte';
	import SkeletronPost from '../../../components/Modules/Skeletron/components/SkeletronPost.svelte';
	import type { PaginationFetcherFn } from 'src/services/posts/types';
	import type { KeyValue } from 'src/types';
	import Paginator from '../Paginator/Paginator.svelte';
	import type { Props_PreviewPost } from '../Post/types';

	export let cubeClass = createObjectCubeClass();

	export let fetchFn: PaginationFetcherFn<Props_PreviewPost>;
	export let fetchFnArgs: KeyValue<string | number> = {};

	export let title: string;

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
			<h2 class="[ visually-hidden ]">Posts</h2>
		{/if}

		<Paginator {fetchFn} {fetchFnArgs} itemComponent={Post} skeletronComponent={SkeletronPost} />
	</section>

	<section class="[ width-100 ]">
		<h2 class="[ visually-hidden ]">Miscellaneuos</h2>
		<slot name="misc" />
	</section>
</div>
