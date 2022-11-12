<script lang="ts">
	import { _Fetch_Posts } from '../../../services/posts/postFetchers';
	import FeedContainer from '../components/../../Layouts/Containers/FeedContainer.svelte';
	import { _Fetch_Communities } from '../../../services/communities/communityFetchers';
	import Miscellaneuos from '../../../components/Layouts/Miscellaneous/Miscellaneuos.svelte';
	import CreatePostHeader from '../../../components/Layouts/CreatePostHeader/CreatePostHeader.svelte';
</script>

<svelte:head>
	<title>Factort | Home</title>
</svelte:head>

<FeedContainer fetchFn={_Fetch_Posts}>
	<div slot="feed">
		<CreatePostHeader type="user" />
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
