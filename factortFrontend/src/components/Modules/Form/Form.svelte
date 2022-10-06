<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import Card from '../Card/Card.svelte';
	import { bundleInputs } from '../../../utils/form4Svelte/utils';
	import type { Store_FormHook } from '../../../stores/formStore/types';
	import { CONTEXT_KEY } from './consts';

	onMount(() => {
		formHook.updateForm(formTitle, {
			name: formTitle,
			percentComplete: 0,
			validatedInputs: bundleInputs(formElement)
		});
	});

	function handleInputChange(e: CustomEvent<HTMLInputElement>) {
		formHook.updateFormInput(e, formTitle);
	}

	export let formHook: Store_FormHook = getContext(CONTEXT_KEY);
	export let formTitle = '';
	export let formIndex = 0;
	let data = {};

	const inputChange = (e: CustomEvent<HTMLInputElement>) => {
		handleInputChange(e as any);
		dispatch('save', e);
	};
	let formElement: HTMLFormElement;

	const dispatch = createEventDispatcher();
</script>

<div class="inner-form-container" data-show-form={formIndex === $formHook.currFormIndex}>
	<TypoHeader cubeClass={{ utilClass: 'text-center' }}>{formTitle}</TypoHeader>

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
