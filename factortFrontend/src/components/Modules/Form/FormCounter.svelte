<script lang="ts">
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import Typography from '../Typography/Typography.svelte';
	import { getContext } from 'svelte';
	import { CONTEXT_KEY } from './consts';
	import type { Store_FormHook } from 'src/stores/formStore/types';
	import { onMount } from 'svelte';

	export let formHook: Store_FormHook = getContext(CONTEXT_KEY);
</script>

<div
	class="[ form__counter ] [ pos-relative margin-block-end-2 overflow-hidden ]"
	style="--data-completed: {$formHook.completionPct}; --data-amount: {$formHook.forms.length};"
>
	<Flexy cubeClass={{ utilClass: 'width-100' }} justify="space-between">
		{#each $formHook.forms as form, i}
			<div class="[ counter__container ] [ grid ]" data-complete="false">
				<Typography fontSize={450} spacingBottom={'05'}>{form.getAttribute('name')}</Typography>
				<Button
					selected={true}
					secondaryVariant="square"
					variant={$formHook.currentIndex === i || $formHook.completionPct >= i + 1
						? 'primary'
						: 'default'}
					on:click={() => formHook.changeIndex(i)}
					cubeClass={{ blockClass: 'counter__count' }}
				>
					<p>{i + 1}</p>
				</Button>
			</div>
		{/each}
	</Flexy>

	<div class="inactive-bar" />
</div>
