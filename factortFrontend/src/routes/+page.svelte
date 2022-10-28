<script lang="ts">
	import Flexy from '../components/Modules/BoxLayouts/Flexy.svelte';
	import Post from '../components/Layouts/Post/Post.svelte';
	import { _Fetch_Posts } from '../services/posts/postFetchers';
	import FeedContainer from '../components/Layouts/Containers/FeedContainer.svelte';
	import CardWithHeader from '../components/Modules/Card/CardWithHeader.svelte';
	import { _Fetch_Communities } from '../services/communities/communityFetchers';
	import DynamicLabel from '../components/Modules/Misc/DynamicLabel.svelte';
	import Card from '../components/Modules/Card/Card.svelte';
	import TextInput from '../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import Button from '../components/Modules/Interactibles/Buttons/Button.svelte';
	import {
		ICON_IMAGE,
		ICON_LINK,
		ICON_MEDIA,
		ICON_PLUS,
		WEB_CREATE_POST_URL,
		WEB_CREATE_POST_WITH_TYPE_URL
	} from '../consts';
	import Icon from '../components/Modules/Icon/Icon.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		fetchPosts();
	});

	async function fetchPosts() {
		return await _Fetch_Posts();
	}

	async function fetchCommunityPreviews() {
		return _Fetch_Communities();
	}
</script>

<svelte:head>
	<title>Factort | Home</title>
</svelte:head>

{#await fetchPosts() then res}
	{#if res.type === 'success'}
		<FeedContainer posts={res.data}>
			<div slot="feed">
				<Card padding={1} cubeClass={{ utilClass: 'margin-block-2' }}>
					<Flexy gap={1} collapseOnMobile={true}>
						<a href={WEB_CREATE_POST_URL} class="[ width-100 ]">
							<TextInput label="Create post" placeholder="Create post" endIcon={ICON_PLUS} />
						</a>
						<Flexy cubeClass={{ utilClass: 'margin-inline-auto' }}>
							<Button to={WEB_CREATE_POST_WITH_TYPE_URL('link')}>
								<Icon>{ICON_LINK}</Icon>
							</Button>
							<Button to={WEB_CREATE_POST_WITH_TYPE_URL('video')}>
								<Icon>{ICON_MEDIA}</Icon>
							</Button>
							<Button to={WEB_CREATE_POST_WITH_TYPE_URL('images')}>
								<Icon>{ICON_IMAGE}</Icon>
							</Button>
						</Flexy>
					</Flexy>
				</Card>
			</div>

			<section slot="misc" class="[ width-100 ]">
				<Flexy useColumn={true}>
					<CardWithHeader
						cubeClass={{ utilClass: 'width-100' }}
						variant="dark"
						title="Relevant communities"
					>
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
			</section>
		</FeedContainer>
	{/if}
{/await}
