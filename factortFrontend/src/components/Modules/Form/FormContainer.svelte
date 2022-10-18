<script lang="ts">
	import type { Store_FormHook } from '../../../stores/formStore/types';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import FormCounter from './FormCounter.svelte';
	import { objLen } from '../../../utils/misc';
	import { createEventDispatcher, setContext } from 'svelte';
	import type { FormTypes } from './types';
	import FormSelect from './FormSelect.svelte';
	import { CONTEXT_KEY } from './consts';
	import { onMount } from 'svelte';

	function dispatchSubmit() {
		dispatch('submit');
	}

	export let formHook: Store_FormHook<any>;
	export let mode: FormTypes = 'counter';

	const dispatch = createEventDispatcher();
	let _this: HTMLElement;

	setContext(CONTEXT_KEY, formHook);
</script>

<div class={'[ form-container ] [ width-100 ]'} bind:this={_this}>
	{#if mode === 'counter'}
		{#if objLen($formHook.forms) > 1}
			<FormCounter />
		{/if}
	{:else if mode instanceof Array}
		<FormSelect names={mode} />
	{/if}

	<slot />

	{#if objLen($formHook.forms) > 1 && !(mode instanceof Array)}
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
		workCondition={$formHook.isTotallyCompleted}
		on:click={dispatchSubmit}
	>
		Submit
	</Button>
</div>
