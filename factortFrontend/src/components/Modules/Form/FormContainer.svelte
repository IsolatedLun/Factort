<script lang="ts">
	import type { Store_FormHook, Store_FormTypes } from '../../../stores/formStore/types';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';
	import FormCounter from './FormCounter.svelte';
	import { objLen } from '../../../utils/misc';
	import { createEventDispatcher, setContext } from 'svelte';
	import FormSelect from './FormSelect.svelte';
	import { CONTEXT_KEY } from './consts';
	import { onMount } from 'svelte';
	import Card from '../Card/Card.svelte';
	import Icon from '../Icon/Icon.svelte';
	import { ICON_ERROR } from '../../../consts';

	onMount(() => {
		// We call this when the component is mounted, to set the selected form
		formHook.changeIndex(0);
	});

	function dispatchSubmit() {
		dispatch('submit');
	}

	export let formHook: Store_FormHook;
	export let mode: Store_FormTypes = 'counter';
	export let formNames: string[] = [];
	export let errorMessage: string = '';

	const dispatch = createEventDispatcher();
	let _this: HTMLElement;

	setContext(CONTEXT_KEY, formHook);
</script>

<div class={'[ form-container ] [ width-100 ]'} bind:this={_this}>
	{#if mode === 'counter'}
		{#if objLen($formHook.forms) > 1}
			<FormCounter />
		{/if}
	{:else if mode === 'select'}
		<FormSelect names={formNames} />
	{/if}

	{#if errorMessage}
		<Card cubeClass={{ utilClass: 'margin-block-end-1' }} variant="error-difference" padding={1}>
			<Flexy cubeClass={{ utilClass: 'margin-inline-1' }} justify="start" align="center">
				<Icon cubeClass={{ utilClass: 'clr-text-error' }}>{ICON_ERROR}</Icon>
				<p>{errorMessage}</p>
			</Flexy>
		</Card>
	{/if}

	<slot />

	{#if objLen($formHook.forms) > 1 && mode === 'counter'}
		<Flexy cubeClass={{ utilClass: 'margin-block-start-2' }}>
			<Button
				variant="primary"
				workCondition={$formHook.currentIndex !== 0}
				on:click={formHook.decrementIndex}>Back</Button
			>
			<Button
				variant="primary"
				workCondition={$formHook.currentIndex < objLen($formHook.forms) - 1}
				on:click={formHook.incrementIndex}>Next</Button
			>
		</Flexy>
	{/if}

	<Button
		cubeClass={{ utilClass: 'margin-block-2 align-self-end width-100' }}
		variant="primary"
		workCondition={$formHook.isFormValid}
		on:click={dispatchSubmit}
	>
		Submit
	</Button>
</div>
