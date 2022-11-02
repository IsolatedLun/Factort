<script lang="ts">
	import { _Fetch_User } from '../../../services/users/userFetchers';
	import { onMount } from 'svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Post from '../../../components/Layouts/Post/Post.svelte';
	import Miscellaneuos from '../Miscellaneous/Miscellaneuos.svelte';
	import {
		_Fetch_Misc_CommunityAdmins,
		_Fetch_Misc_CommunityPreviews
	} from '../../../services/communities/communityFetchers';

	async function fetchUser() {
		return await _Fetch_User(Number(id));
	}

	export let id: number;
</script>

{#await fetchUser() then res}
	{#if res.type === 'success'}
		<div class="[ user-view ]">
			<header>
				<Flexy align="end" gap={2} collapseOnMobile={true} alignCenterOnMobile={true}>
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

			<FeedContainer
				title="Latest Posts"
				posts={res.data.posts}
				cubeClass={{ utilClass: 'margin-block-start-5' }}
			>
				<section slot="misc" class="[ width-100 ]" data-desktop>
					<Miscellaneuos
						sections={[
							{
								title: 'Joined Communitiess',
								id: null,
								fetchFn: _Fetch_Misc_CommunityPreviews
							},
							{
								title: 'Admins',
								id: 1,
								fetchFn: _Fetch_Misc_CommunityAdmins
							}
						]}
					/>
				</section>
			</FeedContainer>
		</div>
	{/if}
{/await}
