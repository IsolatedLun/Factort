<script lang="ts">
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../../utils/cubeCss/cubeCss';
	import type { Props_CubeCSS } from '../../../../utils/cubeCss/types';

	function setType(node: HTMLInputElement) {
		node.type = type;
	}

	export let cubeClass: Props_CubeCSS = createObjectCubeClass({
		blockClass: 'input-container',
		utilClass: 'width-100'
	});

	export let variant = 'default';
	export let secondaryVariant = 'default';
	export let placeholder = 'Enter text';
	export let label: string;
	export let showLabel = false;
	export let value = '';
	export let id = window.crypto.randomUUID();
	export let type: 'text' | 'email' | 'password' = 'text';

	const _class = createStringCubeCSSClass(cubeClass, {
		compostClass: 'input'
	});
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
		{id}
		class="[ input ] [  width-100 ]"
		data-variant={variant}
		data-secondary-variant={secondaryVariant}
		{placeholder}
	/>
	<slot />
</div>