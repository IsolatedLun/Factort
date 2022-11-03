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
	import Miscellaneuos from '../components/Layouts/Miscellaneous/Miscellaneuos.svelte';

	async function fetchCommunityPreviews() {
		return _Fetch_Communities();
	}
</script>

<svelte:head>
	<title>Factort | Home</title>
</svelte:head>

<FeedContainer fetchFn={_Fetch_Posts}>
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

	<section slot="misc" class="[ width-100 ]" data-desktop>
		<Miscellaneuos
			sections={[
				{
					title: 'Relevant Communities',
					id: null,
					fetchFn: _Fetch_Communities
				}
			]}
		/>
	</section>
</FeedContainer>
