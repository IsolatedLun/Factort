<script lang="ts">
	import { _Fetch_Post } from '../../../services/posts/postFetchers';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Miscellaneuos from '../../../components/Layouts/Miscellaneous/Miscellaneuos.svelte';
	import { addPostToHistory } from '../../../utils/postHistory/postHistroy';
	import { onMount } from 'svelte';
	import { globalStore } from '../../../stores/global';

	onMount(() => {
		const posts = addPostToHistory({ id, title, date_visited: new Date().toDateString() });
		globalStore.update((state) => ({ ...state, visitedStore: { visitedPosts: posts, idx: 0 } }));
	});

	function fetchPost() {
		return _Fetch_Post(Number(id));
	}

	export let id: string;
	export let title: string;
</script>

<svelte:head>
	<title>Factort | {title}</title>
</svelte:head>

<FeedContainer fetchFn={fetchPost} isInThread={true}>
	<section slot="misc" class="[ width-100 ]" data-desktop>
		<Miscellaneuos withFooter={true} />
	</section>
</FeedContainer>
