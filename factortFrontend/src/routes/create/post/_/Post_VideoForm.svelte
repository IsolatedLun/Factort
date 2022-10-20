<script lang="ts">
	import { minLenValidator } from '../../../../utils/form4Svelte/validators';
	import Form from '../../../../components/Modules/Form/Form.svelte';
	import FileInput from '../../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import TextInput from '../../../../components/Modules/Interactibles/Inputs/TextInput.svelte';

	let video: File;
</script>

<Form formTitle="Video" formIndex={2} let:inputChange>
	<TextInput
		label="Title"
		placeholder="Enter title"
		showLabel={true}
		on:validate={inputChange}
		validators={[minLenValidator(2)]}
	/>
	<FileInput
		label="Video"
		expectedFile="video"
		on:validate={inputChange}
		on:_input={(e) => (video = e.detail.files && e.detail.files[0])}
	/>
</Form>
