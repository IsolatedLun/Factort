<script lang="ts">
	import { _Fetch_User } from '../../../services/users/userFetchers';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Miscellaneuos from '../Miscellaneous/Miscellaneuos.svelte';
	import {
		_Fetch_Community,
		_Fetch_Misc_CommunityAdmins,
		_Fetch_Misc_CommunityPreviews
	} from '../../../services/communities/communityFetchers';
	import { globalStore } from '../../../stores/global';
	import { BACKEND_ROOT_URL, ICON_PLUS } from '../../../consts';
	import Profile from '../../../components/Modules/User/Profile.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';

	async function fetchCommunity() {
		return await _Fetch_Community(Number(id));
	}

	export let id: number;
</script>

{#await fetchCommunity() then res}
	{#if res.type === 'success'}
		<div class="[ community-view ]">
			<header class="[ view__header ]">
				<div class="[ margin-block-end-2 ] [ pos-relative ]">
					<div class="[ header__banner ] [ border-radius-cubed ]">
						<img src={BACKEND_ROOT_URL + res.data.banner} alt="" />
					</div>

					<div class="[ header__info ] [ pos-absolute ]" data-desktop>
						<div class="[ header__profile ]">
							<img src={BACKEND_ROOT_URL + res.data.profile} alt="" />
						</div>
					</div>
				</div>
				<Flexy
					collapseOnMobile={true}
					alignCenterOnMobile={true}
					cubeClass={{ utilClass: 'margin-inline-2' }}
					align="center"
					gap={2}
					justify="space-between"
				>
					<p><small>g/</small> <big>{res.data.name}</big></p>
					<Flexy align="center" gap={2}>
						<p>{res.data.members} <small>members</small></p>
						<Button variant="primary" secondaryVariant="sausage" icon={ICON_PLUS}>Join</Button>
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
