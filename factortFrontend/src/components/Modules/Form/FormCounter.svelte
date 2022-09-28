<script lang="ts">
	import { formStore } from '../../../stores/formStore/form-store';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import Typography from '../Typography/Typography.svelte';
	import type { Props_Form } from './types';

	function sumFormCompletionPercentage() {
		let sum = 0;

		forms.forEach((form) => (sum += form.percentComplete));
		return sum;
	}

	export let forms: Props_Form[] = [];
	let completionPct = 0;

	$: {
		completionPct = sumFormCompletionPercentage();
	}
</script>

<div
	class="[ form__counter ] [ pos-relative margin-block-end-2 overflow-hidden ]"
	style="--data-completed: {sumFormCompletionPercentage()}; --data-amount: {forms.length};"
>
	<Flexy cubeClass={{ utilClass: 'width-100' }} justify="space-between">
		{#each forms as form, i}
			<div class="[ counter__container ] [ grid ]" data-complete="false">
				<Typography fontSize={450} spacingBottom={'05'}>{form.name}</Typography>
				<Button
					selected={true}
					secondaryVariant="square"
					variant={completionPct > i ? 'primary' : 'default'}
					on:click={() => formStore.update((state) => ({ ...state, currFormIndex: i }))}
					cubeClass={{ blockClass: 'counter__count' }}
				>
					<p>{i + 1}</p>
				</Button>
			</div>
		{/each}
	</Flexy>

	<div class="inactive-bar" />
</div>
