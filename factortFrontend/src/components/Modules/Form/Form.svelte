<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import Card from '../Card/Card.svelte';
	import { bundleInputs } from '../../../utils/form4Svelte/utils';
	import type { Store_FormHook } from '../../../stores/formStore/types';
	import { CONTEXT_KEY } from './consts';

	onMount(() => {
		addForm();
	});

	function addForm() {
		formHook.updateForm(formTitle, {
			name: formTitle,
			percentComplete: 0,
			validatedInputs: bundleInputs(formElement)
		});
	}

	function handleInputChange(e: CustomEvent<HTMLInputElement>) {
		if (e.detail.type === 'file' && e.detail.files && e.detail.files.length > 0)
			formHook.updateData(e.detail.files[0], e.detail.name);
		else if (e.detail.type === 'file')
			// This are for file inputs that are optional and empty
			formHook.updateData(null, e.detail.name);
		else formHook.updateData(e.detail.value, e.detail.name);

		formHook.updateFormInput(e, formTitle);
	}

	function inputChange(e: CustomEvent<HTMLInputElement>) {
		if (!$formHook.forms[formTitle]) {
			addForm();
		}

		handleInputChange(e as any);
		dispatch('save', e);
	}

	export let formHook: Store_FormHook<any> = getContext(CONTEXT_KEY);
	export let formTitle = '';
	export let formIndex = 0;

	export let isNested = false;

	let formElement: HTMLFormElement;

	const dispatch = createEventDispatcher();
</script>

<div
	class="inner-form-container"
	data-form-id={formIndex}
	data-show-form={formIndex === $formHook.currFormIndex}
>
	{#if !isNested}
		<TypoHeader cubeClass={{ utilClass: 'text-center' }}>{formTitle}</TypoHeader>
	{/if}

	<Card cubeClass={{ utilClass: 'padding-1' }}>
		<Card variant="dark" cubeClass={{ utilClass: 'padding-2' }}>
			<Flexy
				tag={'form'}
				cubeClass={{ blockClass: 'form' }}
				useColumn={true}
				gap={1}
				bind:_this={formElement}
			>
				<slot {inputChange} />
			</Flexy>
		</Card>
	</Card>
</div>
