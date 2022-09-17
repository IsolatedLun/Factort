<script lang='ts'>
	import TypoHeader from "../../components/Modules/Typography/TypoHeader.svelte";
    import VisuallyHidden from "../../components/Modules/Accessiblity/VisuallyHidden.svelte";
	import Flexy from "../Modules/BoxLayouts/Flexy.svelte";
	import Profile from "../Modules/User/Profile.svelte";
	import TextInput from "../Modules/Interactibles/Inputs/TextInput.svelte";
	import Button from "../Modules/Interactibles/Buttons/Button.svelte";
	import Icon from "../Modules/Icon/Icon.svelte";
	import { ICON_CARET_LEFT, ICON_CARET_RIGHT, ICON_SEARCH, NAVBAR_CM_ID } from "../../consts";
    import { onMount } from "svelte";
	import { toggleContextMenu } from "../../utils/contextMenu/contextMenu";
	import ContextMenu from "./ContextMenu/ContextMenu.svelte";
    import ContextMenuItem from "./ContextMenu/ContextMenuItem.svelte";

    onMount(() => {
        _this.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            
            toggleContextMenu(e, NAVBAR_CM_ID);
        })
    })

    let isLogged = false;

    let _this: HTMLElement;
</script>

<navbar 
    bind:this={_this}
    class="[ primary-navbar ] [ padding-inline-3 padding-block-small display-block ]" 
    aria-labelledby="primaryNavigation">
    <Flexy align='center'>
        <TypoHeader cubeClass={{ blockClass: 'navbar__header', utilClass: 'pos-relative' }} spacing={0}>
            Factort<VisuallyHidden id='primaryNavigation'>Primary navigation</VisuallyHidden>
        </TypoHeader>
        
        <Flexy align='center'>
            <div data-desktop>
                <Flexy align='center' gap={2} cubeClass={{ utilClass: 'margin-inline-end-2' }}>
                    <Button workCondition={false}>
                       <Icon>{ ICON_CARET_LEFT }</Icon>
                    </Button>
                    <Button workCondition={false}>
                        <Icon>{ ICON_CARET_RIGHT }</Icon>
                    </Button>
                </Flexy>
            </div>
            <TextInput placeholder='Search' label='Search' endIcon={ICON_SEARCH} />
        </Flexy>
        {#if isLogged}
            <div class="[ navbar__user ]">
                <Flexy>
                    <Profile />
                </Flexy>
            </div>
            {:else}
            <Button variant='primary'>
                Create Account
            </Button>
        {/if}
    </Flexy>
</navbar>

<ContextMenu id={NAVBAR_CM_ID}>
    <ContextMenuItem action={() => null}>
        Stick to side
    </ContextMenuItem>
</ContextMenu>