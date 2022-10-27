<script lang="ts">
	import { createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import Card from './Card.svelte';
	import type { CardTypes } from './types';

	export let title: string;
	export let cubeClass = createObjectCubeClass();
	export let variant: CardTypes = 'default';
</script>

<Card {cubeClass} {variant}>
	<TypoHeader
		fontHeadingSize={500}
		cubeClass={{
			blockClass: 'card__header',
			utilClass: 'margin-block-end-1 padding-1 text-center'
		}}
	>
		{title}
	</TypoHeader>
	<slot />
</Card>
