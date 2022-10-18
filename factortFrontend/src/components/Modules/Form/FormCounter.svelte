<script lang="ts">
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import Typography from '../Typography/Typography.svelte';
	import { getContext } from 'svelte';
	import { CONTEXT_KEY } from './consts';
	import type { Store_FormHook } from 'src/stores/formStore/types';

	export let formHook: Store_FormHook<any> = getContext(CONTEXT_KEY);

	let forms = $formHook.forms;
</script>

<div
	class="[ form__counter ] [ pos-relative margin-block-end-2 overflow-hidden ]"
	style="--data-completed: {$formHook.totalCompletionPct}; --data-amount: {Object.values(forms)
		.length};"
>
	<Flexy cubeClass={{ utilClass: 'width-100' }} justify="space-between">
		{#each Object.values(forms) as form, i}
			<div class="[ counter__container ] [ grid ]" data-complete="false">
				<Typography fontSize={450} spacingBottom={'05'}>{form.name}</Typography>
				<Button
					selected={true}
					secondaryVariant="square"
					variant={$formHook.currFormIndex === i || $formHook.totalCompletionPct >= i + 1
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
