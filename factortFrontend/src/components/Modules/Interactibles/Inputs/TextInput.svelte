<script lang="ts">
	import {
		createInputIdWithLabel,
		underscoreizeLabel,
		validateInput
	} from '../../../../utils/form4Svelte/utils';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import Icon from '../../Icon/Icon.svelte';
	import type { InputTypes, TextInputDropdownDisplayModes } from './types';
	import type { SyntheticTarget } from '../../../../types';
	import Button from '../Buttons/Button.svelte';
	import { ICON_EYE } from '../../../../consts';
	import type { Props_InputValidator } from '../../../../utils/form4Svelte/types';

	onMount(() => {
		if (createRandomId) id = window?.crypto.randomUUID();
		else id = createInputIdWithLabel(label.toLowerCase());

		_this.id = id;

		handleInput({ target: _this });
	});

	onDestroy(() => {
		dispatch('validate', { input: _this, destroy: true });
	});

	function setType(node: HTMLInputElement) {
		node.type = type;
	}

	function togglePasswordType() {
		showPassword = !showPassword;

		if (showPassword) _this.type = 'text';
		else _this.type = 'password';
	}

	function handleInput(e: Event | SyntheticTarget<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;

		const { errors: _errors, isValid } = validateInput(target, validators);
		_this.setAttribute('data-input-valid', String(isValid));

		errors = _errors;
		valid = isValid;
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let validators: Props_InputValidator<never>[] = [];

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';

	export let value = '';
	export let valid = false;

	export let id = '';
	export let type: InputTypes = 'text';
	export let label: string;
	export let name: string = underscoreizeLabel(label.toLowerCase());
	export let dropdownDisplayMode: TextInputDropdownDisplayModes = 'absolute';

	export let createRandomId = true;
	export let showLabel = false;
	export let endIcon = '';

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative'
	});

	let _this: HTMLInputElement;
	let showPassword = false;
	let errors: string[] = [];

	const dispatch = createEventDispatcher();
</script>

<div class={_class}>
	<label
		for={id}
		class={`[ ${!showLabel ? 'visually-hidden' : ''} ] [ margin-block-end-1 display-inline-block ]`}
		>{label}</label
	>
	<div class="[ width-100 pos-relative ]">
		<input
			use:setType
			bind:value
			on:input={(e) => {
				value = _this.value;
				handleInput(e);

				dispatch('validate', { input: _this, destroy: false });
				dispatch('_input', _this);
			}}
			bind:this={_this}
			{id}
			{name}
			class="[ input ] [  width-100 ]"
			data-variant={variant}
			data-secondary-variant={secondaryVariant}
			data-input-valid="true"
			{placeholder}
		/>
		{#if type === 'password'}
			<Button
				on:click={togglePasswordType}
				selected={showPassword}
				secondaryVariant="extra-small"
				cubeClass={{ blockClass: 'input__password-toggler', utilClass: 'pos-absolute' }}
			>
				<Icon>
					{ICON_EYE}
				</Icon>
			</Button>
		{/if}

		{#if endIcon}
			<Icon
				cubeClass={{
					blockClass: 'container__end-icon',
					utilClass: 'pos-absolute clr-input-border'
				}}
			>
				{endIcon}
			</Icon>
		{/if}
	</div>
	<ul class="[ input__error-list ] [ clr-text-error margin-inline-start-2 margin-block-start-1 ]">
		{#each errors as error}
			<li>{error}</li>
		{/each}
	</ul>

	<div
		class={`[ input__dropdown ] [ pos-${dropdownDisplayMode} ]`}
		data-state={dropdownDisplayMode}
	>
		<slot />
	</div>
</div>
