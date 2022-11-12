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
	import { globalStore } from '../../../stores/global';
	import { ICON_PLUS } from '../../../consts';

	async function fetchUser() {
		return await _Fetch_User(Number(id));
	}

	export let id: number;
</script>

{#await fetchUser() then res}
	{#if res.type === 'success'}
		<div class="[ user-view ]">
			<header class="[ view__header ] [ margin-inline-auto ]">
				<Flexy align="end" gap={2} collapseOnMobile={true} alignCenterOnMobile={true}>
					<DynamicLabel
						props={{ type: 'user', data: res.data }}
						baseFontSize={600}
						variant="view"
					/>
					<Flexy>
						<Button
							workCondition={!res.data.is_following && $globalStore.userStore.isLogged}
							secondaryVariant="sausage"
							variant="primary"
							icon={ICON_PLUS}>Follow</Button
						>
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
								title: 'Joined Communities',
								id: res.data.id,
								fetchFn: _Fetch_Misc_CommunityPreviews
							}
						]}
					/>
				</section>
			</FeedContainer>
		</div>
	{/if}
{/await}
