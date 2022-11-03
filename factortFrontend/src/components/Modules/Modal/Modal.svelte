<script lang="ts">
	import { ICON_TIMES } from '../../../consts';
	import { closeModal } from '../../../utils/modal/modal';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import Icon from '../Icon/Icon.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';

	export let id: string;
	export let cubeClass = createObjectCubeClass();

	let _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'main-modal',
		compostClass: 'card',
		utilClass: 'padding-2'
	});
</script>

<dialog class={_class} {id} data-variant="dark">
	<slot />

	<Button
		on:click={() => closeModal(id)}
		cubeClass={{ utilClass: 'width-100 margin-block-start-3' }}
	>
		<Icon>{ICON_TIMES}</Icon>
	</Button>
</dialog>
