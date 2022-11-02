<script lang="ts">
	import TypoHeader from '../../Modules/Typography/TypoHeader.svelte';
	import VisuallyHidden from '../../Modules/Accessiblity/VisuallyHidden.svelte';
	import Flexy from '../../Modules/BoxLayouts/Flexy.svelte';
	import TextInput from '../../Modules/Interactibles/Inputs/TextInput.svelte';
	import Button from '../../Modules/Interactibles/Buttons/Button.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import {
		ICON_BARS,
		ICON_CARET_LEFT,
		ICON_CARET_RIGHT,
		ICON_SEARCH,
		ICON_SETTINGS,
		NAVBAR_CM_ID,
		NAVBAR_MODAL_ID,
		WEB_LOGIN_URL,
		WEB_LOGOUT_URL,
		WEB_SIGNUP_URL
	} from '../../../consts';
	import { onMount } from 'svelte';
	import { toggleContextMenu } from '../../../utils/contextMenu/contextMenu';
	import ContextMenu from '../ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from '../ContextMenu/ContextMenuItem.svelte';
	import { layoutStore } from '../../../stores/layoutStore/layout-store';
	import { globalStore } from '../../../stores/global';
	import DynamicLabel from '../../Modules/Misc/DynamicLabel.svelte';
	import Modal from '../../Modules/Modal/Modal.svelte';
	import { closeModal, openModal } from '../../../utils/modal/modal';
	import LinkList from '../../Modules/List/LinkList.svelte';
	import LinkListItem from '../../../components/Modules/List/LinkListItem.svelte';
	import { createDefaultUser } from '../../../utils/defaultProps';
	import { goto } from '$app/navigation';
	import { destroyTokens } from '../../../utils/tokenHandler';

	onMount(() => {
		layoutStore.subscribe((state) => {
			stickToSide = state.stickNavbarToSide;
		});
	});

	function handleContextMenu(e: MouseEvent) {
		toggleContextMenu(e, NAVBAR_CM_ID);
	}

	function logOut() {
		closeModal(NAVBAR_MODAL_ID);
		destroyTokens();

		globalStore.update((state) => ({
			...state,
			isLogged: false,
			user: createDefaultUser()
		}));

		goto(WEB_LOGIN_URL);
	}

	let stickToSide = false;
	let showStickyInput = false;

	let _this: HTMLElement;
</script>

{#key stickToSide}
	<navbar
		bind:this={_this}
		on:contextmenu={handleContextMenu}
		class="[ primary-navbar ] [ flex flex-direction-column padding-inline-3 padding-block-small 
			display-block pos-relative ]"
		aria-labelledby="primaryNavigation"
		data-row-layout={stickToSide}
	>
		<Flexy
			useColumn={stickToSide}
			align="center"
			gap={stickToSide ? 2 : 1}
			cubeClass={{ utilClass: `${stickToSide ? 'padding-block-1' : ''} flex-grow` }}
		>
			<TypoHeader
				cubeClass={{ blockClass: 'navbar__header', utilClass: 'pos-relative' }}
				spacing={0}
			>
				<a href="/">
					Factort<VisuallyHidden id="primaryNavigation">Primary navigation</VisuallyHidden>
				</a>
			</TypoHeader>

			<Flexy useColumn={stickToSide}>
				<div data-desktop>
					<Flexy
						useColumn={stickToSide}
						gap={2}
						cubeClass={{ utilClass: !stickToSide ? 'margin-inline-end-2' : '' }}
					>
						<Button workCondition={false} cubeClass={{ utilClass: 'margin-block-auto' }}>
							<Icon>{ICON_CARET_LEFT}</Icon>
						</Button>
						<Button workCondition={false}>
							<Icon>{ICON_CARET_RIGHT}</Icon>
						</Button>
					</Flexy>
				</div>
				{#if stickToSide}
					<Button
						on:click={() => (showStickyInput = !showStickyInput)}
						selected={showStickyInput}
						cubeClass={{ utilClass: 'margin-block-start-1' }}
					>
						<Icon>{ICON_SEARCH}</Icon>
					</Button>
				{/if}
				<div data-show-sticky-input={showStickyInput} data-desktop>
					<TextInput
						cubeClass={{ utilClass: 'navbar__search-input' }}
						placeholder="Search"
						label="Search"
						endIcon={ICON_SEARCH}
					/>
				</div>
			</Flexy>

			<div data-mobile>
				<Button on:click={() => openModal(NAVBAR_MODAL_ID)}>
					<Icon>
						{ICON_BARS}
					</Icon>
				</Button>
			</div>

			<div data-desktop>
				{#if $globalStore.isLogged}
					<div class="[ navbar__user ]">
						<Flexy gap={2}>
							<DynamicLabel props={{ type: 'user', data: $globalStore.user }} />
							<Button on:click={() => openModal(NAVBAR_MODAL_ID)} ariaLabel="Open More Options"
								><Icon>{ICON_SETTINGS}</Icon></Button
							>
						</Flexy>
					</div>
				{:else}
					<Flexy gap={2} useColumn={stickToSide}>
						<Button to={WEB_SIGNUP_URL} variant="primary">Sign up</Button>
						<Button to={WEB_LOGIN_URL} variant="primary">Login</Button>
					</Flexy>
				{/if}
			</div>
		</Flexy>
	</navbar>

	<ContextMenu id={NAVBAR_CM_ID}>
		<ContextMenuItem
			action={() => layoutStore.set({ stickNavbarToSide: !stickToSide })}
			useSelected={true}
			selected={stickToSide}
		>
			Stick to side
		</ContextMenuItem>
	</ContextMenu>

	<Modal id={NAVBAR_MODAL_ID}>
		{#if $globalStore.isLogged}
			<LinkList cubeClass={{ utilClass: 'margin-block-end-2' }}>
				<LinkListItem to="settings" name="Settings" />
			</LinkList>
			<DynamicLabel props={{ type: 'user', data: $globalStore.user }} />
			<Button
				cubeClass={{ utilClass: 'margin-inline-auto width-100 margin-block-start-2' }}
				variant="primary"
				ariaLabel="Log out"
				on:click={logOut}>Log out</Button
			>
		{:else}
			<LinkList>
				<LinkListItem to={WEB_LOGIN_URL} name="Login" />
				<LinkListItem to={WEB_SIGNUP_URL} name="Sign up" />
			</LinkList>
		{/if}
	</Modal>
{/key}
