<script lang="ts">
	import { formStore } from '../../../stores/formStore/form-store';
	import { onMount } from 'svelte';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import FormCounter from './FormCounter.svelte';
	import type { Props_Form, Props_FormContext } from './types';
	import type { KeyValue } from '../../../types';

	onMount(() => {
		forms = Object.values($formStore.forms);
	});

	function incrementFormIndex() {
		formStore.update((state) => {
			return { ...state, currFormIndex: state.currFormIndex + 1 };
		});
	}

	function decrementFormIndex() {
		formStore.update((state) => {
			return { ...state, currFormIndex: state.currFormIndex - 1 };
		});
	}

	let forms: Props_Form[] = [];
</script>

<div class="[ form-container ]">
	{#if forms.length > 1}
		<FormCounter {forms} />
	{/if}

	<slot />

	{#if forms.length > 1}
		<Flexy cubeClass={{ utilClass: 'margin-block-start-2' }}>
			<Button
				variant="primary"
				workCondition={$formStore.currFormIndex > 0}
				on:click={decrementFormIndex}>Back</Button
			>
			<Button
				variant="primary"
				workCondition={$formStore.currFormIndex < forms.length - 1}
				on:click={incrementFormIndex}>Next</Button
			>
		</Flexy>
	{/if}
</div>
