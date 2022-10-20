<script lang="ts">
	import { createInputIdWithLabel, validateInput } from '../../../../utils/form4Svelte/utils';
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import type { FileInputStylings, FileInputTypes, Input_Complex_File_Types } from './types';
	import type { SyntheticTarget } from '../../../../types';
	import Image from '../../../../components/Misc/MediaElements/Image.svelte';
	import type { Props_InputValidator } from '../../../../utils/form4Svelte/types';
	import { createExceptedFileValidator } from '../../../../utils/form4Svelte/validators';
	import FileInputSquareImage from './_/FileInputStyling/FileInput_SquareImage.svelte';
	import { onDestroy } from 'svelte';

	onMount(() => {
		if (createRandomId) id = window.crypto.randomUUID();
		else id = createInputIdWithLabel(label.toLowerCase());

		fileData.type = expectedFile;

		_this.id = id;

		const [_accept, validator] = createExceptedFileValidator(_this, expectedFile);
		if (validator) validators.push(validator);
		if (_accept) _this.accept = _accept;

		handleInput({ target: _this });
		dispatch('validate', _this);
	});

	onDestroy(() => {});

	function handleInput(e: Event | SyntheticTarget<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;

		// If the input is optional and is empty
		if (isOptional && target.files && target.files.length === 0) {
			_this.setAttribute('data-input-valid', 'true');

			// If the input is required or has a file
		} else if (!isOptional || (target.files && target.files.length > 0)) {
			const { errors: _errors, isValid } = validateInput(target, validators);
			_this.setAttribute('data-input-valid', String(isValid));
			errors = _errors;
		}

		if (expectedFile === 'image' && target.files && target.files[0]) {
			const file = target.files[0];
			fileData = {
				type: 'image',
				data: {
					size: file.size,
					type: file.type,
					name: file.name,
					url: URL.createObjectURL(file)
				}
			};
		}
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let validators: Props_InputValidator[] = [];
	export let expectedFile: FileInputTypes; // used for previewing and validation reasons
	export let isOptional = false;

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let value = '';
	export let id = '';
	export let multiple = false;
	export let createRandomId = true;
	export let label: string;
	export let name: string = label.toLowerCase();
	export let styling: FileInputStylings = 'default';

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative'
	});

	let _this: HTMLInputElement;
	let errors: string[] = [];
	let fileData: Input_Complex_File_Types = {
		type: 'file',
		data: { type: '', size: 0, name: '', url: null }
	};

	const dispatch = createEventDispatcher();
</script>

<div class={_class}>
	<label for={id} class={'[ margin-block-end-1 display-inline-block ]'}>{label}</label>
	<div class="[ width-100 pos-relative ]">
		{#if expectedFile === 'image'}
			{#if styling === 'default' && fileData.type === 'image'}
				<div
					class="[ input__image-preview ] [ margin-inline-auto margin-block-1 border-radius-cubed ]"
				>
					<Image props={{ src: fileData.data.url, alt: fileData.data.name }} />
				</div>
			{:else if styling === 'square-image' && fileData.type === 'image'}
				<FileInputSquareImage {id} {fileData} {styling} />
			{/if}
		{/if}
		<input
			bind:value
			on:input={(e) => {
				value = _this.value;
				handleInput(e);

				dispatch('validate', e.target);
				dispatch('_input', e.target);
			}}
			bind:this={_this}
			{id}
			type="file"
			class="[ input ] [  width-100 ]"
			data-variant={variant}
			data-secondary-variant={secondaryVariant}
			data-input-valid="true"
			data-hide={styling !== 'default'}
			{placeholder}
			{multiple}
			{name}
		/>
	</div>
	<div data-hide={styling !== 'default'}>
		<ul class="[ input__error-list ] [ clr-text-error margin-inline-start-2 margin-block-start-1 ]">
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	</div>
	<slot />
</div>
