<script lang="ts">
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import {
		emailValidator,
		minLenValidator,
		specialCharacterValidator
	} from '../../../utils/form4Svelte/validators';
	import { _Register_View } from '../../../services/auth/authService';
	import FileInput from '../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import {
		createDefaultCreatePostData,
		createDefaultSignUpData
	} from '../../../utils/defaultProps';
	import Form from '../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../components/Modules/Form/FormContainer.svelte';
	import { useForm } from '../../../stores/formStore/form-store';
	import TextArea from '../../../components/Modules/Interactibles/Inputs/TextArea.svelte';
	import type { Form_CreatePost } from '../types';
	import FormImagesSlot from '../../../components/Modules/Form/Slots/Form_ImagesSlot.svelte';

	let data: Form_CreatePost = createDefaultCreatePostData();
	let formHook = useForm(data, 'select');
</script>

<FormContainer
	{formHook}
	mode="select"
	formNames={['Text', 'Images', 'Video', 'Link']}
	on:submit={(e) => console.log(data)}
>
	<Form formTitle={'Text'} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(1)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<TextArea
			label="Content"
			showLabel={true}
			validators={[minLenValidator(5), emailValidator()]}
			bind:value={data.content}
			on:validate={inputChange}
		/>
	</Form>
	<Form formTitle={'Images'} formIndex={1} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(1)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<FormImagesSlot on:change={inputChange} on:images={(e) => (data.images = e.detail)} />
	</Form>
	<Form formTitle={'Video'} formIndex={2} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(1)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<FileInput label="Video" name="video" expectedFile="video" on:validate={inputChange} />
	</Form>
	<Form formTitle={'Link'} formIndex={3} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(1)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<TextInput
			label="Link"
			showLabel={true}
			validators={[minLenValidator(1)]}
			bind:value={data.link}
			on:validate={inputChange}
		/>
	</Form>
</FormContainer>
