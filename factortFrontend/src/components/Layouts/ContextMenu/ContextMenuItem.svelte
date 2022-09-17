<script lang='ts'>
	import Icon from "../../../components/Modules/Icon/Icon.svelte";
    import Button from "../../../components/Modules/Interactibles/Buttons/Button.svelte";

    export let action: () => void;

    let useSelected = false;
    let selected = false
</script>

<li>
    <Button 
        on:click={() => {
            action();
            if(useSelected)
                selected = !selected;
        }}
        variant='none' 
        cubeClass={{ compostClass: 'hoverable', utilClass: 'padding-inline-2 padding-block-1 fs-350' }}>
        <slot />

        {#if useSelected}
            <Icon>W</Icon>
        {/if}
    </Button>
</li>