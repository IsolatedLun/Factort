<script lang="ts">
	import { createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import Card from './Card.svelte';
	import type { CardTypes } from './types';

	export let title: string = '';
	export let cubeClass = createObjectCubeClass();
	export let variant: CardTypes = 'default';
	export let tag: string = 'div';
	export let padding = 0;
</script>

<Card {cubeClass} {variant} {padding} {tag}>
	{#if title}
		<TypoHeader
			fontHeadingSize={500}
			cubeClass={{
				blockClass: 'card__header',
				utilClass: 'margin-block-end-1 padding-1 text-center'
			}}
		>
			{title}
		</TypoHeader>
	{:else}
		<header class="[ card__header padding-1 margin-block-end-1 ]">
			<slot name="header" />
		</header>
	{/if}
	<slot />
</Card>
