<script lang="ts">
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import type { Store_FormHook } from '../../../stores/formStore/types';
	import { CONTEXT_KEY } from './consts';
	import Card from '../Card/Card.svelte';

	onMount(() => {
		formHook.instantiateForm(formElement);
	});

	function handleInputChange(e: CustomEvent<HTMLInputElement>) {
		formHook.validateForm(formElement);
	}

	function inputChange(e: CustomEvent<HTMLInputElement>) {
		handleInputChange(e as any);
		dispatch('save', e);
	}

	export let formHook: Store_FormHook = getContext(CONTEXT_KEY);
	export let formTitle = '';
	export let formIndex = 0;

	let formElement: HTMLFormElement;

	const dispatch = createEventDispatcher();
</script>

<div
	class="inner-form-container"
	data-form-id={formIndex}
	data-show-form={formIndex === $formHook.currentIndex}
>
	<TypoHeader cubeClass={{ utilClass: 'text-center' }}>{formTitle}</TypoHeader>

	<Card variant="dark" cubeClass={{ utilClass: 'padding-inline-3 padding-block-2' }}>
		<form
			enctype="multipart/form-data"
			class="[ form ] [ flex flex-direction-column gap-1 ]"
			name={formTitle}
			bind:this={formElement}
			on:submit|preventDefault
		>
			<slot {inputChange} />
		</form>
	</Card>
</div>
