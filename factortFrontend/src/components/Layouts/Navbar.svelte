<script>
	import TypoHeader from "../../components/Modules/Typography/TypoHeader.svelte";
    import VisuallyHidden from "../../components/Modules/Accessiblity/VisuallyHidden.svelte";
	import Flexy from "../Modules/BoxLayouts/Flexy.svelte";
	import Profile from "../Modules/User/Profile.svelte";
	import TextInput from "../Modules/Interactibles/Inputs/TextInput.svelte";
	import Button from "../Modules/Interactibles/Buttons/Button.svelte";
	import Icon from "../Modules/Icon/Icon.svelte";
	import { ICON_CARET_LEFT, ICON_CARET_RIGHT } from "../../consts";

</script>

<navbar class="[ primary-navbar ] [ padding-inline-3 padding-block-small display-block ]" aria-labelledby="primaryNavigation">
    <Flexy align='center'>
        <TypoHeader cubeClass={{ blockClass: 'navbar__header', utilClass: 'pos-relative' }} spacing={0}>
            Factort<VisuallyHidden id='primaryNavigation'>Primary navigation</VisuallyHidden>
        </TypoHeader>
        
        <Flexy align='center'>
            <Flexy align='center' gap={2} cubeClass={{ utilClass: 'margin-inline-end-2' }}>
                <Button>
                   <Icon>{ ICON_CARET_LEFT }</Icon>
                </Button>
                <Button>
                    <Icon>{ ICON_CARET_RIGHT }</Icon>
                </Button>
            </Flexy>
            <TextInput placeholder='Search' label='Search' />
        </Flexy>
        <div class="[ navbar__user ]">
            <Flexy>
                <Profile />
            </Flexy>
        </div>
    </Flexy>
</navbar>