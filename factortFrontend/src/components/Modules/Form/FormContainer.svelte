<script lang="ts">
	import { formStore } from '../../../stores/formStore/form-store';
	import { onMount, setContext } from 'svelte';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import { CONTEXT_KEY } from './consts';
	import FormCounter from './FormCounter.svelte';
	import type { Props_Form, Props_FormContext } from './types';

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
</script>

<div class="[ form-container ]">
	{#if $formStore.forms.length > 1}
		<FormCounter forms={$formStore.forms} />
	{/if}

	<slot />

	{#if $formStore.forms.length > 1}
		<Flexy cubeClass={{ utilClass: 'margin-block-start-2' }}>
			<Button
				variant="primary"
				workCondition={$formStore.currFormIndex > 0}
				on:click={decrementFormIndex}>Back</Button
			>
			<Button
				variant="primary"
				workCondition={$formStore.currFormIndex < $formStore.forms.length - 1}
				on:click={incrementFormIndex}>Next</Button
			>
		</Flexy>
	{/if}
</div>
