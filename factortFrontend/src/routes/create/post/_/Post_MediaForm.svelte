<script lang="ts">
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Form from '../../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../../components/Modules/Form/FormContainer.svelte';
	import FileInput from '../../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import TextInput from '../../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import type { Store_FormHook } from '../../../../stores/formStore/types';

	export let mediaFormHook: Store_FormHook<any>;

	let images: File[] = [];
</script>

<Form formTitle="Media post" formIndex={1} let:inputChange>
	<TextInput label="Title" placeholder="Enter title" showLabel={true} on:validate={inputChange} />
	<FormContainer formHook={mediaFormHook} mode={['Image', 'Video']} isNested={true}>
		<Form formTitle="Image post" isNested={true}>
			<FileInput
				label="Image"
				expectedFile="image"
				multiple={true}
				on:validate={inputChange}
				on:_input={(e) => (images = e.detail.files)}
			/>

			<Flexy justify="start">
				{#each images as image}
					<p>lol</p>
				{/each}
			</Flexy>
		</Form>
		<Form formTitle="Video post" formIndex={1} isNested={true}>
			<FileInput
				label="Video"
				expectedFile="video"
				multiple={true}
				on:validate={inputChange}
				on:_input={(e) => (images = e.detail.files)}
			/>
		</Form>
	</FormContainer>
</Form>
