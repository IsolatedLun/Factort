<script lang="ts">
	import {
		_Fetch_User,
		_Toggle_UserFollower,
		_User_Latest_Followers
	} from '../../../services/users/userFetchers';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Miscellaneuos from '../Miscellaneous/Miscellaneuos.svelte';
	import {
		_Fetch_Misc_CommunityAdmins,
		_Fetch_Misc_CommunityPreviews
	} from '../../../services/communities/communityFetchers';
	import { globalStore } from '../../../stores/global';
	import { ICON_MINUS, ICON_PLUS } from '../../../consts';
	import SkeltronUserView from '../../../components/Modules/Skeletron/layouts/SkeltronUserView.svelte';
	import { _Fetch_User_Posts } from '../../../services/posts/postFetchers';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import type { Success_OR_Error__Response } from 'src/services/types';
	import type { Props_UserView } from './types';

	async function fetchUser() {
		res = await _Fetch_User(Number(id));
	}

	function toggleUserFollow() {
		if (res.type === 'success') {
			res.data.c_is_following = !res.data.c_is_following;
			_Toggle_UserFollower(res.data.id);

			if (res.data.c_is_following) res.data.followers++;
			else res.data.followers--;
		}
	}

	export let id: number;

	let res: Success_OR_Error__Response<Props_UserView>;
</script>

{#await fetchUser()}
	<SkeltronUserView />
{:then _}
	{#if res.type === 'success'}
		<div class="[ user-view ]">
			<header class="[ view__header ] [ margin-inline-auto ]">
				<Flexy align="end" gap={2} collapseOnMobile={true} alignCenterOnMobile={true}>
					<DynamicLabel
						props={{ type: 'user', data: res.data }}
						baseFontSize={600}
						variant="view"
					/>
					<Flexy align="center" gap={2}>
						<p class="[ fs-350 ]">{res.data.followers} followers</p>
						{#if res.data.c_is_following}
							<Button
								workCondition={res.data.c_is_following && $globalStore.userStore.isLogged}
								secondaryVariant="sausage"
								variant="downvote"
								on:click={toggleUserFollow}
								icon={ICON_MINUS}>Unfollow</Button
							>
						{:else}
							<Button
								workCondition={!res.data.c_is_following &&
									$globalStore.userStore.isLogged &&
									res.data.id !== $globalStore.userStore.user.id}
								secondaryVariant="sausage"
								variant="primary"
								on:click={toggleUserFollow}
								icon={ICON_PLUS}>Follow</Button
							>
						{/if}
					</Flexy>
				</Flexy>
			</header>

			<FeedContainer
				title="Latest Posts"
				fetchFn={_Fetch_User_Posts}
				fetchFnArgs={{ id }}
				cubeClass={{ utilClass: 'margin-block-start-5' }}
			>
				<section slot="misc" class="[ width-100 ]" data-desktop>
					<Miscellaneuos
						sections={[
							{
								title: 'Joined Communities',
								id,
								fetchFn: _Fetch_Misc_CommunityPreviews
							},
							{
								title: 'Latest Followers',
								id,
								fetchFn: _User_Latest_Followers
							}
						]}
					/>
				</section>
			</FeedContainer>
		</div>
	{:else}
		<div class="[ grid place-items-center margin-block-auto ]">
			<Card padding={2} variant="error-difference">404: User does not exist</Card>
		</div>
	{/if}
{/await}
