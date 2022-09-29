<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { formStore } from '../../../stores/formStore/form-store';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import TypoHeader from '../Typography/TypoHeader.svelte';
	import Card from '../Card/Card.svelte';
	import { bundleInputs } from '../../../utils/form4Svelte/utils';

	onMount(() => {
		formStore.update((state) => {
			return {
				...state,
				forms: {
					...state.forms,
					[formTitle]: {
						name: formTitle,
						percentComplete: 0,
						validatedInputs: bundleInputs(formElement)
					}
				}
			};
		});
	});

	function handleInputChange(e: CustomEvent<HTMLInputElement>) {
		formStore.update((state) => {
			const inputId = e.detail.id;
			const _state = state;

			_state.forms[formTitle].validatedInputs[inputId] =
				e.detail.getAttribute('data-input-valid')! === 'true' ? true : false;
			return _state;
		});
	}

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

<div class="inner-form-container" data-show-form={formIndex === $formStore.currFormIndex}>
	<TypoHeader cubeClass={{ utilClass: 'text-center' }}>{formTitle}</TypoHeader>

	<Card cubeClass={{ utilClass: 'padding-1' }}>
		<Card variant="dark" cubeClass={{ utilClass: 'padding-2' }}>
			<Flexy
				tag={'form'}
				cubeClass={{ blockClass: 'form' }}
				useColumn={true}
				gap={2}
				bind:_this={formElement}
			>
				<slot {inputChange} />
			</Flexy>
		</Card>
	</Card>
</div>
