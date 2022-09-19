<script lang="ts">
	import { onMount } from 'svelte';
	import {
		createObjectCubeClass,
		createStringCubeCSSClass
	} from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';

	onMount(() => {
		if (!id) id = window.crypto.randomUUID();

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

	export let cubeClass: Props_CubeCSS = createObjectCubeClass();

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let value = '';
	export let id = '';
	export let label: string;

	export let showLabel = false;

	const _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'input-container',
		utilClass: 'width-100 pos-relative'
	});

	let _this: HTMLTextAreaElement;
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
		{id}
		class="[ input ] [  width-100 ]"
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		{placeholder}
	/>
</div>
