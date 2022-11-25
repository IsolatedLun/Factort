<script lang="ts">
	import TypoHeader from '../../Modules/Typography/TypoHeader.svelte';
	import VisuallyHidden from '../../Modules/Accessiblity/VisuallyHidden.svelte';
	import Flexy from '../../Modules/BoxLayouts/Flexy.svelte';
	import TextInput from '../../Modules/Interactibles/Inputs/TextInput.svelte';
	import Button from '../../Modules/Interactibles/Buttons/Button.svelte';
	import Icon from '../../Modules/Icon/Icon.svelte';
	import {
		ICON_BARS,
		ICON_SEARCH,
		ICON_SETTINGS,
		NAVBAR_CM_ID,
		NAVBAR_MODAL_ID,
		NAVBAR_SEARCH_MODAL_ID,
		WEB_LOGIN_URL,
		WEB_MY_SETTINGS_URL,
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
	import HistoryButtons from './_/HistoryButtons.svelte';
	import NavbarSearch from './_/NavbarSearch.svelte';

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

		window.location.replace(WEB_LOGIN_URL);
	}

	let stickToSide = false;
	let showMobileInput = true;

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
		data-tooltip-parent=""
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

			<Flexy useColumn={stickToSide} gap={2}>
				<HistoryButtons {stickToSide} />

				<div data-hide={stickToSide}>
					<NavbarSearch />
				</div>

				{#if stickToSide}
					<Button on:click={() => openModal(NAVBAR_SEARCH_MODAL_ID)}>
						<Icon>
							{ICON_SEARCH}
						</Icon>
					</Button>
				{/if}
			</Flexy>

			<div data-mobile>
				<Flexy gap={2}>
					<Button on:click={() => openModal(NAVBAR_MODAL_ID)}>
						<Icon>
							{ICON_BARS}
						</Icon>
					</Button>
					<Button on:click={() => openModal(NAVBAR_SEARCH_MODAL_ID)}>
						<Icon>
							{ICON_SEARCH}
						</Icon>
					</Button>
				</Flexy>
			</div>

			<div data-desktop>
				{#if $globalStore.userStore.isLogged}
					<div class="[ navbar__user ]">
						<Flexy gap={2} useColumn={stickToSide}>
							<DynamicLabel props={{ type: 'user', data: $globalStore.userStore.user }} />
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
		{#if $globalStore.userStore.isLogged}
			<LinkList cubeClass={{ utilClass: 'margin-block-end-2' }}>
				<LinkListItem to={WEB_MY_SETTINGS_URL} name="Settings" />
			</LinkList>
			<div class="[ grid ] [ place-items-center ]">
				<DynamicLabel props={{ type: 'user', data: $globalStore.userStore.user }} />
			</div>
			<Button
				cubeClass={{ utilClass: 'margin-inline-auto width-100 margin-block-start-3' }}
				variant="primary"
				secondaryVariant="sausage"
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
	<Modal id={NAVBAR_SEARCH_MODAL_ID} withBackground={false}>
		<NavbarSearch state="relative" />
	</Modal>
{/key}
