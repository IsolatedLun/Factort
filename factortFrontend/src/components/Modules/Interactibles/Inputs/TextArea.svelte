<script lang="ts">
	import type { SyntheticTarget } from '../../../../types';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import { validateInput } from '../../../../utils/form4Svelte/utils';
	import type { Props_InputValidator } from '../../../../utils/form4Svelte/types';

	onMount(() => {
		if (!id) id = window?.crypto.randomUUID();
		handleInput({ target: _this as any });

		_this.addEventListener('keydown', function (e) {
			if (e.key === 'Tab') {
				e.preventDefault();

				_this.value =
					_this.value.substring(0, _this.selectionStart) +
					'\t' +
					_this.value.substring(_this.selectionEnd);

				_this.selectionStart = _this.selectionEnd = _this.selectionStart + 1;
			}
		});
	});

	onDestroy(() => {
		dispatch('validate', { input: _this, destroy: true });
	});

	function handleInput(e: Event | SyntheticTarget<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;

		const { errors: _errors, isValid } = validateInput(target, validators);
		_this.setAttribute('data-input-valid', String(isValid));
		errors = _errors;
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let inputCubeClass: Props_CubeCSS = createObjectCubeClass();

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let value = '';
	export let id = '';
	export let label: string;
	export let resize: null | 'vertical' | 'horizontal' = null;

	export let allowUpdate = true;
	export let showLabel = false;
	export let validators: Props_InputValidator<never>[] = [];

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative'
	});

	const _inputCubeClass = createStringCubeCSSClass(inputCubeClass, {
		compostClass: 'input',
		utilClass: 'width-100 ' + 'resize-' + resize
	});

	let _this: HTMLTextAreaElement;
	let errors: string[] = [];

	const dispatch = createEventDispatcher();
</script>

<div class={_class}>
	<label
		for={id}
		class={`[ ${!showLabel ? 'visually-hidden' : ''} ] [ margin-block-end-1 display-inline-block ]`}
		>{label}</label
	>
	<textarea
		bind:this={_this}
		bind:value
		on:input={(e) => {
			value = _this.value;
			handleInput(e);

			dispatch('validate', { input: _this, destroy: false, allowUpdate });
		}}
		{id}
		class={_inputCubeClass}
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		data-input-valid="true"
		{placeholder}
	/>

	<ul class="[ input__error-list ] [ clr-text-error margin-inline-start-2 margin-block-start-1 ]">
		{#each errors as error}
			<li>{error}</li>
		{/each}
	</ul>
</div>
