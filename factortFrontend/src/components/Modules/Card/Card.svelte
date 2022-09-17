<script lang='ts'>
	import { onMount } from "svelte";
	import type { EventFunction } from "../../../types";
	import { createObjectCubeClass, createStringCubeCSSClass } from "../../../utils/cubeCss/cubeCss";

    onMount(() => {
        use(_this);
    })

    export let variant = 'default';
    export let tag = 'div';
    export let use: EventFunction<HTMLElement> = (e) => null;

    export let cubeClass = createObjectCubeClass();

    const _class = createStringCubeCSSClass(cubeClass, {
        compostClass: 'card'
    });
    let _this: HTMLButtonElement;
</script>

<svelte:element bind:this="{_this}" this="{tag}" class="{_class}" data-variant="{variant}">
    <slot />
</svelte:element>