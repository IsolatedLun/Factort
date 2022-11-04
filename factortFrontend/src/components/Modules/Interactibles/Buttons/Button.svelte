<script lang="ts">
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import { onMount } from 'svelte';
	import type { EventFunction } from '../../../../types';
	import type { ButtonSecondaryVariants, ButtonVariants } from './types';
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import Icon from '../../Icon/Icon.svelte';

	onMount(() => {
		use(_this);
	});

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let variant: ButtonVariants = 'default';
	export let secondaryVariant: ButtonSecondaryVariants = 'default';
	export let ariaLabel = 'Button';
	export let to = '';
	export let icon = '';

	export let workCondition = true;
	export let isFetching = false;
	export let selected = false;
	export let allowOutline = false;
	export let use: EventFunction<HTMLButtonElement> = (e) => null;

	const _class = createStringCubeCSSClass(cubeClass, {
		compostClass: 'button',
		utilClass: 'pos-relative cursor-pointer'
	});

	let _this: HTMLButtonElement;
</script>

{#if to}
	<a href={to}>
		<button
			on:click
			bind:this={_this}
			class={_class}
			data-variant={variant}
			data-secondary-variant={secondaryVariant}
			data-selected={selected}
			data-work-condition={workCondition && !isFetching}
			data-async-loading={isFetching}
			data-allow-outline={allowOutline}
			aria-label={ariaLabel}
		>
			{#if icon}
				<Flexy>
					<div>
						<slot />
					</div>
					<Icon>{icon}</Icon>
				</Flexy>
			{:else}
				<slot />
			{/if}
		</button>
	</a>
{:else}
	<button
		on:click
		bind:this={_this}
		class={_class}
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		data-selected={selected}
		data-work-condition={workCondition && !isFetching}
		data-async-loading={isFetching}
		data-allow-outline={allowOutline}
		aria-label={ariaLabel}
	>
		{#if icon}
			<Flexy gap={2}>
				<div>
					<slot />
				</div>
				<Icon>{icon}</Icon>
			</Flexy>
		{:else}
			<slot />
		{/if}
	</button>
{/if}
