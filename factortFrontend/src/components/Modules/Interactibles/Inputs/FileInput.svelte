<script lang="ts">
	import { createInputIdWithLabel, validateInput } from '../../../../utils/form4Svelte/utils';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';
	import type { FileInputStylings, FileInputTypes, Input_Complex_File_Types } from './types';
	import type { SyntheticTarget } from '../../../../types';
	import type { Props_InputValidator } from '../../../../utils/form4Svelte/types';
	import { createExceptedFileValidator } from '../../../../utils/form4Svelte/validators';
	import FileInputImage from './_/FileInputStyling/FileInput_Image.svelte';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import Video from '../../../../components/Misc/MediaElements/Video.svelte';

	onMount(() => {
		if (createRandomId) id = window?.crypto.randomUUID();
		else id = createInputIdWithLabel(label.toLowerCase());

		fileData.type = expectedFile;

		_this.id = id;

		const [_accept, validator] = createExceptedFileValidator(_this, expectedFile);
		if (validator) validators.push(validator);
		if (_accept) _this.accept = _accept;

		handleInput({ target: _this });
		dispatch('validate', { input: _this, destroy: false });
	});

	onDestroy(() => {
		dispatch('validate', { input: _this, destroy: true });
	});

	function handleInput(e: Event | SyntheticTarget<HTMLInputElement>) {
		const target = e.target as HTMLInputElement;

		// If the input is optional and is empty
		if (isOptional && target.files && target.files.length === 0) {
			_this.setAttribute('data-input-valid', 'true');
			isInputValid = true;

			// If the input is required or has a file
		} else if (!isOptional || (target.files && target.files.length > 0)) {
			const { errors: _errors, isValid } = validateInput(target, validators);
			_this.setAttribute('data-input-valid', String(isValid));

			errors = _errors;
			isInputValid = isValid;
		}

		if (
			(expectedFile === 'image' || expectedFile === 'video' || expectedFile === 'audio') &&
			target.files &&
			target.files[0]
		) {
			const file = target.files[0];
			fileData = {
				type: expectedFile,
				data: {
					size: file.size,
					type: file.type,
					name: file.name,
					url: URL.createObjectURL(file)
				}
			};
		}

		dispatch('_input', e);
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();
	export let validators: Props_InputValidator<never>[] = [];
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
	export let displayInputWithStyling = false;
	export let centerSelf: boolean = false;

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: `pos-relative ${centerSelf ? 'grid place-items-center margin-inline-auto' : ''}`
	});

	let _this: HTMLInputElement;
	let errors: string[] = [];
	let fileData: Input_Complex_File_Types = {
		type: 'file',
		data: { type: '', size: 0, name: '', url: null }
	};
	let isInputValid = false;

	const dispatch = createEventDispatcher();
</script>

<div class={_class}>
	<label for={id} class={'[ margin-block-end-1 display-inline-block ]'}>{label}</label>
	<div class="[ {!centerSelf ? 'width-100' : ''} pos-relative ]">
		{#if expectedFile === 'image' && fileData.type === 'image'}
			<FileInputImage {id} {fileData} {styling} {isInputValid} />
		{/if}
		{#if expectedFile === 'video'}
			{#if styling === 'default' && fileData.type === 'video'}
				<div class="[ margin-block-end-1 ]">
					<Video props={{ src: fileData.data.url, alt: 'Post video' }} />
				</div>
			{/if}
		{/if}
		{#if expectedFile === 'audio'}
			{#if styling === 'default' && fileData.type === 'audio'}
				<div class="[ margin-block-end-1 ]">
					<audio class="[ width-100 ]" controls src={fileData.data.url ?? null} />
				</div>
			{/if}
		{/if}
		<input
			bind:value
			on:input={(e) => {
				value = _this.value;
				handleInput(e);

				dispatch('validate', { input: _this, destroy: false });
				dispatch('_input', _this);
			}}
			bind:this={_this}
			{id}
			type="file"
			class="[ input ] [  width-100 margin-block-start-1 ]"
			data-variant={variant}
			data-secondary-variant={secondaryVariant}
			data-input-valid="true"
			data-hide={styling !== 'default' && !displayInputWithStyling}
			{placeholder}
			{multiple}
			{name}
		/>
	</div>
	<div>
		<ul class="[ input__error-list ] [ clr-text-error margin-inline-start-2 margin-block-start-1 ]">
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	</div>
	<slot />
</div>
