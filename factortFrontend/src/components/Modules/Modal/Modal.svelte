<script lang="ts">
	import { ICON_TIMES } from '../../../consts';
	import { closeModal } from '../../../utils/modal/modal';
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import Icon from '../Icon/Icon.svelte';
	import Button from '../Interactibles/Buttons/Button.svelte';

	export let id: string;
	export let withBackground: boolean = true;
	export let cubeClass = createObjectCubeClass();

	let _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'main-modal',
		compostClass: withBackground ? 'card' : '',
		utilClass: withBackground ? 'padding-2' : ''
	});
</script>

<dialog class={_class} data-variant="dark" data-background-transparent={!withBackground} {id}>
	<slot />

	<Button
		on:click={() => closeModal(id)}
		cubeClass={{ utilClass: 'width-100 margin-block-start-1' }}
		variant="downvote"
		ariaLabel="Close modal"
		secondaryVariant="sausage"
	>
		<Icon>{ICON_TIMES}</Icon>
	</Button>
</dialog>
