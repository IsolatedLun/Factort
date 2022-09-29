<script lang="ts">
	import { validateInput } from '../../../../utils/form4Svelte/utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import Icon from '../../Icon/Icon.svelte';
	import type { InputTypes, Props_InputValidators } from './types';
	import type { SyntheticTarget } from '../../../../types';

	onMount(() => {
		id = window.crypto.randomUUID();
		_this.id = id;

		handleInput({ target: _this });
	});

	function setType(node: HTMLInputElement) {
		node.type = type;
	}

	function handleInput(e: Event | SyntheticTarget<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;

		const { errors: _errors, isValid } = validateInput(target, validators);
		_this.setAttribute('data-input-valid', String(isValid));
		errors = _errors;
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let validators: Props_InputValidators[] = [];

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let value = '';
	export let id = '';
	export let type: InputTypes = 'text';
	export let label: string;

	export let showLabel = false;
	export let endIcon = '';

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative'
	});

	let _this: HTMLInputElement;
	let x = false;
	let errors: string[] = [];
	const dispatch = createEventDispatcher();
</script>

<div class={_class}>
	<label
		for={id}
		class={`[ ${!showLabel ? 'visually-hidden' : ''} ] [ margin-block-end-1 display-inline-block ]`}
		>{label}</label
	>
	<input
		use:setType
		bind:value
		on:input={(e) => {
			value = _this.value;
			dispatch('validate', e.target);

			handleInput(e);
		}}
		bind:this={_this}
		{id}
		class="[ input ] [  width-100 ]"
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		{placeholder}
	/>
	<ul class="[ input__error-list ] [ margin-inline-start-2 margin-block-start-1 ]">
		{#each errors as error}
			<li>{error}</li>
		{/each}
	</ul>
	{#if endIcon}
		<Icon
			cubeClass={{ blockClass: 'container__end-icon', utilClass: 'pos-absolute clr-input-border' }}
		>
			{endIcon}
		</Icon>
	{/if}
	<slot />
</div>
