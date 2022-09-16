<script lang='ts'>
	import { createObjectCubeClass, createStringCubeCSSClass } from "../../../utils/cubeCss/cubeCss";
    import type { FlexyLayoutTypes } from "./types";
	import { onMount } from "svelte";

    onMount(() => {
        if (layout === 'center') {
            align = 'center';
        } else if (layout === 'columnCenter') {
            align = 'center';
            useColumn = true;
        }

    })

    export let tag = 'div'
    export let justify = 'space-between'
    export let align = 'start'
    export let layout: FlexyLayoutTypes = 'default'
    export let useColumn = false
    export let gap = 1;
    export let cubeClass = createObjectCubeClass();

    let _class = createStringCubeCSSClass(cubeClass, {
        utilClass: `flex align-items-${align} justify-content-${justify} gap-${gap}`
    })
</script>

<svelte:element this="{tag}" class="{_class}">
    <slot />
</svelte:element>