<script lang="ts">
	import Flexy from '../components/Modules/BoxLayouts/Flexy.svelte';
	import Post from '../components/Layouts/Post/Post.svelte';
	import { _Fetch_Posts } from '../services/posts/postFetchers';
	import FeedContainer from '../components/Layouts/Containers/FeedContainer.svelte';
	import CardWithHeader from '../components/Modules/Card/CardWithHeader.svelte';
	import { _Fetch_Communities } from '../services/communities/communityFetchers';
	import DynamicLabel from '../components/Modules/Misc/DynamicLabel.svelte';

	async function fetchPosts() {
		return _Fetch_Posts();
	}

	async function fetchCommunityPreviews() {
		return _Fetch_Communities();
	}
</script>

<svelte:head>
	<title>Factort | Home</title>
</svelte:head>

<FeedContainer>
	<section slot="feed">
		<span class="[ visually-hidden ]">Posts</span>
		<Flexy useColumn={true}>
			{#await fetchPosts() then res}
				{#if res.type === 'success'}
					{#each res.data as post}
						<Post props={{ ...post }} />
					{/each}
				{/if}
			{/await}
		</Flexy>
	</section>

	<div slot="misc" class="[ width-100 ]">
		<span class="[ visually-hidden ]">Miscellaneuos</span>
		<Flexy useColumn={true}>
			<CardWithHeader cubeClass={{ utilClass: 'width-100' }} title="Relevant communities">
				<Flexy useColumn={true} gap={2} cubeClass={{ utilClass: 'padding-1' }}>
					{#await fetchCommunityPreviews() then res}
						{#if res.type === 'success'}
							{#each res.data as community}
								<DynamicLabel props={{ type: 'community', data: community }} />
							{/each}
						{/if}
					{/await}
				</Flexy>
			</CardWithHeader>
		</Flexy>
	</div>
</FeedContainer>
