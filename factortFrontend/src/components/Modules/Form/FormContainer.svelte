<script lang="ts">
	import type { Store_FormHook } from '../../../stores/formStore/types';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import FormCounter from './FormCounter.svelte';
	import { objLen } from '../../../utils/misc';
	import { setContext } from 'svelte';
	import { CONTEXT_KEY } from './consts';

	export let formHook: Store_FormHook;

	setContext(CONTEXT_KEY, formHook);
</script>

<div class="[ form-container ]">
	{#if objLen($formHook.forms) > 1}
		<FormCounter />
	{/if}

	<slot />

	{#if objLen($formHook.forms) > 1}
		<Flexy cubeClass={{ utilClass: 'margin-block-start-2' }}>
			<Button
				variant="primary"
				workCondition={$formHook.currFormIndex !== 0}
				on:click={formHook.decrementIndex}>Back</Button
			>
			<Button
				variant="primary"
				workCondition={$formHook.currFormIndex < objLen($formHook.forms) - 1}
				on:click={formHook.incrementIndex}>Next</Button
			>
		</Flexy>
	{/if}

	<Button
		cubeClass={{ utilClass: 'margin-block-2 align-self-end width-100' }}
		variant="primary"
		workCondition={$formHook.isFormComplete}
		on:click={() => console.log($formHook.data)}
	>
		Submit
	</Button>
</div>
