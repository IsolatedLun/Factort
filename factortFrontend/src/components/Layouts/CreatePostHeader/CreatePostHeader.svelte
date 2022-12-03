<script lang="ts">
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import {
		ICON_COMMUNITY,
		ICON_IMAGE,
		ICON_LINK,
		ICON_MEDIA,
		ICON_MICROPHONE,
		ICON_PLUS,
		WEB_CREATE_COMMUNITY_URL,
		WEB_CREATE_POST_URL,
		WEB_CREATE_POST_WITH_TYPE_URL
	} from '../../../consts';
	import type { PostCreationTypes } from './types';

	export let type: PostCreationTypes;
	export let communityId: number = -1;
</script>

<Card padding={1} cubeClass={{ utilClass: 'margin-block-2' }}>
	<Flexy gap={1} collapseOnMobile={true}>
		<a
			href={WEB_CREATE_POST_WITH_TYPE_URL(communityId, '')}
			class="[ width-100 ]"
			aria-label="Create text post"
		>
			<div aria-hidden="true">
				<TextInput
					label="Create post"
					placeholder={type === 'user' ? 'Create post' : 'Create post in this community'}
					endIcon={ICON_PLUS}
				/>
			</div>
		</a>
		<Flexy cubeClass={{ utilClass: 'margin-inline-auto' }}>
			<Button to={WEB_CREATE_POST_WITH_TYPE_URL(communityId, 'link')} ariaLabel="Create link post">
				<Icon>{ICON_LINK}</Icon>
			</Button>
			<Button
				to={WEB_CREATE_POST_WITH_TYPE_URL(communityId, 'video')}
				ariaLabel="Create video post"
			>
				<Icon>{ICON_MEDIA}</Icon>
			</Button>
			<Button
				to={WEB_CREATE_POST_WITH_TYPE_URL(communityId, 'audio')}
				ariaLabel="Create audio post"
			>
				<Icon>{ICON_MICROPHONE}</Icon>
			</Button>
			<Button
				to={WEB_CREATE_POST_WITH_TYPE_URL(communityId, 'images')}
				ariaLabel="Create image post"
			>
				<Icon>{ICON_IMAGE}</Icon>
			</Button>

			{#if type !== 'community'}
				<Button
					cubeClass={{ utilClass: 'margin-inline-start-2' }}
					to={WEB_CREATE_COMMUNITY_URL}
					ariaLabel="Create community"
				>
					<Icon>{ICON_COMMUNITY}</Icon>
				</Button>
			{/if}
		</Flexy>
	</Flexy>
</Card>
