<script lang="ts">
	import { page } from '$app/stores';
	import { _Fetch_User } from '../../../services/users/userFetchers';
	import { onMount } from 'svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Post from '../../../components/Layouts/Post/Post.svelte';

	async function fetchUser() {
		return await _Fetch_User(Number(id));
	}

	const [id, username] = $page.params.user.split('/');

	let data = fetchUser();
</script>

<svelte:head>
	<title>Factort | u/{username}</title>
</svelte:head>

{#await fetchUser() then res}
	{#if res.type === 'success'}
		<div class="[ user-view ]">
			<header>
				<Flexy align="end">
					<DynamicLabel
						props={{ type: 'user', data: res.data }}
						baseFontSize={600}
						variant="view"
					/>
					<Flexy>
						<Button>Follow</Button>
					</Flexy>
				</Flexy>
			</header>

			<FeedContainer posts={res.data.posts} cubeClass={{ utilClass: 'margin-block-start-5' }}>
				<section slot="misc" class="[ width-100 ]">
					<h2 class="[ visually-hidden ]">Miscellaneuos</h2>
					<p>meow</p>
				</section>
			</FeedContainer>
		</div>
	{/if}
{/await}
