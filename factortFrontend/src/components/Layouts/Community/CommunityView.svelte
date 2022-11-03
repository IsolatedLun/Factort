<script lang="ts">
	import { _Fetch_User } from '../../../services/users/userFetchers';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Miscellaneuos from '../Miscellaneous/Miscellaneuos.svelte';
	import {
		_Fetch_Community,
		_Fetch_Misc_CommunityAdmins,
		_Fetch_Misc_CommunityPreviews
	} from '../../../services/communities/communityFetchers';
	import { globalStore } from '../../../stores/global';

	async function fetchCommunity() {
		return await _Fetch_Community(Number(id));
	}

	export let id: number;
</script>

{#await fetchCommunity() then res}
	{#if res.type === 'success'}
		<div class="[ community-view ]">
			<header>
				<Flexy align="end" gap={2} collapseOnMobile={true} alignCenterOnMobile={true}>
					<DynamicLabel
						props={{ type: 'community', data: res.data }}
						baseFontSize={600}
						variant="view"
					/>
					<Flexy>
						<Button>Join</Button>
					</Flexy>
				</Flexy>
			</header>

			<FeedContainer
				title="Posts"
				posts={res.data.posts}
				cubeClass={{ utilClass: 'margin-block-start-5' }}
			>
				<section slot="misc" class="[ width-100 ]" data-desktop>
					<Miscellaneuos
						sections={[
							{
								title: 'Admins',
								id: res.data.id,
								fetchFn: _Fetch_Misc_CommunityAdmins
							}
						]}
					/>
				</section>
			</FeedContainer>
		</div>
	{/if}
{/await}
