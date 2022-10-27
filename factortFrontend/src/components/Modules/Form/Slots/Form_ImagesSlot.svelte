<script lang="ts">
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import Button from '../../Interactibles/Buttons/Button.svelte';
	import FileInput from '../../Interactibles/Inputs/FileInput.svelte';

	function updateImages() {
		const imageInputs = document.querySelectorAll(
			'input[data-input-valid=true]'
		) as NodeListOf<HTMLInputElement>;
		let images: File[] = [];

		imageInputs.forEach((input) => {
			if (input.files) images.push(input.files[0]);
		});

		dispatch('images', images);
	}

	export let imageCount = 1;

	let _this: HTMLElement;
	const dispatch = createEventDispatcher();
</script>

<Flexy
	justify="center"
	cubeClass={{ blockClass: 'container__images-slot', utilClass: 'flex-wrap gap-2 width-100' }}
	bind:_this
>
	{#each { length: imageCount } as _, i}
		<FileInput
			label={'Image ' + (i + 1)}
			name={'image-' + 1}
			expectedFile="image"
			styling="square-image"
			on:validate={() => {
				dispatch('change', []);
				updateImages();
			}}
		/>
	{/each}
</Flexy>

<Flexy justify="center" collapseOnMobile={true}>
	<Button on:click={() => imageCount++} variant="primary" cubeClass={{ utilClass: 'width-100' }}
		>Add image</Button
	>
	<Button
		on:click={() => (imageCount !== 1 ? imageCount-- : null)}
		workCondition={imageCount !== 1}
		variant="downvote"
		cubeClass={{ utilClass: 'width-100' }}>Remove last image</Button
	>
</Flexy>
