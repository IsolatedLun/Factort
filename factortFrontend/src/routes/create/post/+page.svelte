<script lang="ts">
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { emailValidator, minLenValidator } from '../../../utils/form4Svelte/validators';
	import { _Register_View } from '../../../services/auth/authService';
	import FileInput from '../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import { createDefaultCreatePostData } from '../../../utils/defaultProps';
	import Form from '../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../components/Modules/Form/FormContainer.svelte';
	import { useForm } from '../../../stores/formStore/form-store';
	import TextArea from '../../../components/Modules/Interactibles/Inputs/TextArea.svelte';
	import type { Form_CreatePost } from '../types';
	import FormImagesSlot from '../../../components/Modules/Form/Slots/Form_ImagesSlot.svelte';
	import { _Create_Post } from '../../../services/create/createPostFetchers';

	function createPost() {
		let _data = { ...data, selected: $formHook.selected.toLowerCase() };

		if (_data.selected === 'images') data.video = null;
		if (_data.selected === 'video') data.images = [];

		_Create_Post({ ..._data, selected: $formHook.selected.toLowerCase() }).then((res) => {
			if (res.type === 'error') errorMessage = 'res.data';
		});
	}

	let data: Form_CreatePost = createDefaultCreatePostData();
	let formHook = useForm(data, 'select');
	let errorMessage: string = '';
</script>

<FormContainer
	{formHook}
	mode="select"
	formNames={['Text', 'Images', 'Video', 'Link']}
	{errorMessage}
	on:submit={createPost}
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
		<FileInput
			label="Video"
			name="video"
			expectedFile="video"
			on:_input={(e) => {
				if (e.detail.files) data.video = e.detail.files[0];
			}}
			on:validate={inputChange}
		/>
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
