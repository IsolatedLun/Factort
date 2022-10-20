<script lang="ts">
	import { minLenValidator } from '../../../../utils/form4Svelte/validators';
	import Form from '../../../../components/Modules/Form/Form.svelte';
	import FileInput from '../../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import TextInput from '../../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import Button from '../../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';

	export let imageInputCounter: number = 1;
</script>

<Form formTitle="Image" formIndex={1} let:inputChange>
	<TextInput
		label="Title"
		placeholder="Enter title"
		showLabel={true}
		on:validate={inputChange}
		validators={[minLenValidator(2)]}
	/>

	<Flexy justify="center" gap={4} cubeClass={{ utilClass: 'flex-wrap margin-inline-auto' }}>
		{#each { length: imageInputCounter } as _, i}
			<div>
				<FileInput
					label="Image"
					expectedFile="image"
					styling="square-image"
					on:validate={inputChange}
				/>
			</div>

			{#if i === imageInputCounter}
				<p>LOL</p>
			{/if}
		{/each}
	</Flexy>

	<Flexy align="center" cubeClass={{ utilClass: 'width-100' }}>
		<Button
			on:click={() => imageInputCounter++}
			variant={'primary'}
			cubeClass={{ utilClass: 'margin-block-start-3 width-100' }}>Add image</Button
		>
		<Button
			on:click={() => {
				if (imageInputCounter !== 1) imageInputCounter--;
			}}
			variant={'downvote-difference'}
			cubeClass={{ utilClass: 'margin-block-start-3 width-100' }}>-</Button
		>
	</Flexy>
</Form>
