<script lang="ts">
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../utils/cubeCss/types';
	import type { Props_InputValidator } from '../../../utils/form4Svelte/types';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import type { BooleanTypes } from './types';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import { underscoreizeLabel } from '../../../utils/form4Svelte/utils';

	onMount(() => {
		if (createRandomId) id = window.crypto.randomUUID();
		_this.type = type;
	});

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	// export let validators: Props_InputValidator[] = [];

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let value: boolean = false;
	export let id = '';
	export let createRandomId = true;
	export let label: string;
	export let name: string = underscoreizeLabel(label.toLowerCase());
	export let type: BooleanTypes = 'checkbox';

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container ' + type,
		utilClass: 'pos-relative'
	});

	let _this: HTMLInputElement;
	let errors: string[] = [];
	let isInputValid = false;

	const dispatch = createEventDispatcher();
</script>

<div class={_class}>
	<Flexy align="center" justify="start">
		<label class="[ clr-text-muted ]" for={name}>{label}:</label>
		<input
			bind:value
			on:input={(e) => {
				value = _this.checked;

				dispatch('validate', { input: _this, destroy: false });
			}}
			bind:this={_this}
			{id}
			class="[ input ]"
			data-variant={variant}
			data-secondary-variant={secondaryVariant}
			data-input-valid="true"
			{placeholder}
			{name}
		/>
	</Flexy>
</div>
