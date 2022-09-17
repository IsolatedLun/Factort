<script lang="ts">
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../../utils/cubeCss/cubeCss';
	import { onMount } from 'svelte';
	import type { EventFunction } from '../../../../types';

	onMount(() => {
		use(_this);
	});

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let workCondition = true;
	export let ariaLabel = 'Button';
	export let isFetching = false;
	export let use: EventFunction<HTMLButtonElement> = (e) => null;

	const _class = createStringCubeCSSClass(cubeClass, {
		compostClass: 'button',
		utilClass: 'pos-relative cursor-pointer'
	});

	let _this: HTMLButtonElement;
</script>

<button
	on:click
	bind:this={_this}
	class={_class}
	data-variant={variant}
	data-secondary-variant={secondaryVariant}
	data-work-condition={workCondition && !isFetching}
	data-async-loading={isFetching}
	aria-label={ariaLabel}
>
	<slot />
</button>