<script lang="ts">
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Form from '../../../../components/Modules/Form/Form.svelte';
	import FileInput from '../../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import TextInput from '../../../../components/Modules/Interactibles/Inputs/TextInput.svelte';

	let images: File[] = [];
</script>

<Form formTitle="Image" formIndex={1} let:inputChange>
	<TextInput label="Title" placeholder="Enter title" showLabel={true} on:validate={inputChange} />
	<FileInput
		label="Image"
		expectedFile="image"
		multiple={true}
		on:validate={inputChange}
		on:_input={(e) => (images = e.detail.files)}
	/>
</Form>
