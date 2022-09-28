<script lang="ts">
	import { onMount } from 'svelte';
	import { formStore } from '../../../stores/formStore/form-store';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import { scale } from 'svelte/transition';
	import Card from '../Card/Card.svelte';

	onMount(() => {
		formStore.update((state) => {
			return { ...state, forms: [...state.forms, { name: formTitle, percentComplete: 0 }] };
		});
	});

	export let formTitle = '';
	export let formIndex = 0;
</script>

{#if formIndex === $formStore.currFormIndex}
	<div transition:scale>
		<TypoHeader cubeClass={{ utilClass: 'text-center' }}>{formTitle}</TypoHeader>

		<Card cubeClass={{ utilClass: 'padding-1' }}>
			<Card variant="dark" cubeClass={{ utilClass: 'padding-2' }}>
				<Flexy tag={'form'} cubeClass={{ blockClass: 'form' }} useColumn={true} gap={2}>
					<slot />
				</Flexy>
			</Card>
		</Card>
	</div>
{/if}
