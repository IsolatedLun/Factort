<script lang="ts">
	import { createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import Card from './Card.svelte';

	export let title: string;
	export let cubeClass = createObjectCubeClass();
</script>

<Card {cubeClass}>
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
