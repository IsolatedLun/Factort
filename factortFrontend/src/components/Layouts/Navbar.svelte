<script lang="ts">
	import TypoHeader from '../../components/Modules/Typography/TypoHeader.svelte';
	import VisuallyHidden from '../../components/Modules/Accessiblity/VisuallyHidden.svelte';
	import Flexy from '../Modules/BoxLayouts/Flexy.svelte';
	import Profile from '../Modules/User/Profile.svelte';
	import TextInput from '../Modules/Interactibles/Inputs/TextInput.svelte';
	import Button from '../Modules/Interactibles/Buttons/Button.svelte';
	import Icon from '../Modules/Icon/Icon.svelte';
	import { ICON_CARET_LEFT, ICON_CARET_RIGHT, ICON_SEARCH, NAVBAR_CM_ID } from '../../consts';
	import { onMount } from 'svelte';
	import { toggleContextMenu } from '../../utils/contextMenu/contextMenu';
	import ContextMenu from './ContextMenu/ContextMenu.svelte';
	import ContextMenuItem from './ContextMenu/ContextMenuItem.svelte';
	import { layoutStore } from '../../stores/layoutStore/layout-store';

	onMount(() => {
		layoutStore.subscribe((state) => {
			stickToSide = state.stickNavbarToSide;
		});
	});

	function handleContextMenu(e: MouseEvent) {
		toggleContextMenu(e, NAVBAR_CM_ID);
	}

	let isLogged = false;
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
			gap={stickToSide ? 2 : 1}
			cubeClass={{ utilClass: `${stickToSide ? 'padding-block-1' : ''} flex-grow` }}
		>
			<TypoHeader
				cubeClass={{ blockClass: 'navbar__header', utilClass: 'pos-relative' }}
				spacing={0}
			>
				Factort<VisuallyHidden id="primaryNavigation">Primary navigation</VisuallyHidden>
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
				<div data-show-sticky-input={showStickyInput}>
					<TextInput
						cubeClass={{ utilClass: 'navbar__search-input' }}
						placeholder="Search"
						label="Search"
						endIcon={ICON_SEARCH}
					/>
				</div>
			</Flexy>
			<div class="[ margin-block-start-auto ]">
				{#if isLogged}
					<div class="[ navbar__user ]">
						<Flexy>
							<Profile />
						</Flexy>
					</div>
				{:else}
					<Button variant="primary">Sign up</Button>
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
{/key}
