<script lang="ts">
	import { _Fetch_User } from '../../../services/users/userFetchers';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import FeedContainer from '../../../components/Layouts/Containers/FeedContainer.svelte';
	import Miscellaneuos from '../Miscellaneous/Miscellaneuos.svelte';
	import {
		_Fetch_Community,
		_Fetch_Misc_CommunityAdmins,
		_Fetch_Misc_CommunityLatestMembers,
		_Fetch_Misc_CommunityPreviews,
		_Toggle_Community_Join
	} from '../../../services/communities/communityFetchers';
	import { globalStore } from '../../../stores/global';
	import { BACKEND_ROOT_URL, ICON_PLUS } from '../../../consts';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import CreatePostHeader from '../CreatePostHeader/CreatePostHeader.svelte';
	import type { Success_OR_Error__Response } from 'src/services/types';
	import type { Props_Community } from './types';
	import SkeletronCommunityView from '../../../components/Modules/Skeletron/layouts/SkeletronCommunityView.svelte';
	import { _Fetch_Community_Posts } from '../../../services/posts/postFetchers';
	import Card from '../../../components/Modules/Card/Card.svelte';

	// When the user's mouse enters the 'create post for the community' section
	// We add the community data to the global store
	// When the mouse leaves, we remove the data
	function replaceCommunityInGlobalStore(add: boolean) {
		globalStore.update((state) => ({
			...state,
			currentCommunity: add ? (res.data as Props_Community) : null
		}));
	}

	function toggleCommunityJoin() {
		if (res.type === 'success') {
			hasJoinedCommunity = !hasJoinedCommunity;
			_Toggle_Community_Join(id);

			if (hasJoinedCommunity) res.data.members++;
			else res.data.members--;
		}
	}

	async function fetchCommunity() {
		res = await _Fetch_Community(Number(id));

		if (res.type === 'success') {
			hasJoinedCommunity = res.data.c_has_joined_community;
		}
	}

	export let id: number;

	let res: Success_OR_Error__Response<Props_Community>;
	let hasJoinedCommunity = false;
</script>

{#await fetchCommunity()}
	<SkeletronCommunityView />
{:then _}
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
						{#if (hasJoinedCommunity || res.data.owner === $globalStore.userStore.user.id) && $globalStore.userStore.isLogged}
							<Button
								variant="downvote"
								secondaryVariant="sausage"
								workCondition={res.data.owner !== $globalStore.userStore.user.id}
								icon={ICON_PLUS}
								on:click={toggleCommunityJoin}>Leave</Button
							>
						{:else}
							<Button
								variant="primary"
								secondaryVariant="sausage"
								icon={ICON_PLUS}
								workCondition={$globalStore.userStore.isLogged}
								on:click={toggleCommunityJoin}>Join</Button
							>
						{/if}
					</Flexy>
				</Flexy>
			</header>

			<FeedContainer
				title="Posts"
				fetchFn={_Fetch_Community_Posts}
				fetchFnArgs={{ id }}
				cubeClass={{ utilClass: 'margin-block-start-5' }}
			>
				<section
					slot="feed"
					on:mouseenter={() => replaceCommunityInGlobalStore(true)}
					on:mouseleave={() => replaceCommunityInGlobalStore(false)}
				>
					<CreatePostHeader communityId={id} type="community" />
				</section>
				<section slot="misc" class="[ width-100 ]" data-desktop>
					<Miscellaneuos
						sections={[
							{
								title: 'Admins',
								id: res.data.id,
								fetchFn: _Fetch_Misc_CommunityAdmins
							},
							{
								title: 'Latest members',
								id: res.data.id,
								fetchFn: _Fetch_Misc_CommunityLatestMembers
							}
						]}
					/>
				</section>
			</FeedContainer>
		</div>
	{:else}
		<div class="[ grid place-items-center margin-block-auto ]">
			<Card padding={2} variant="error-difference">404: Community does not exist</Card>
		</div>
	{/if}
{/await}
