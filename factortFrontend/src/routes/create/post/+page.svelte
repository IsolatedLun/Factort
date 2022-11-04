<script lang="ts">
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import {
		emailValidator,
		linkValidator,
		minLenValidator
	} from '../../../utils/form4Svelte/validators';
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
	import { getUrlParams } from '../../../utils/misc';
	import { onMount } from 'svelte';
	import { CREATE_SELECT_FORM_ID, WEB_POST_URL } from '../../../consts';
	import { goto } from '$app/navigation';
	import { preCheck__Post } from '../../../utils/preChecks';

	onMount(() => {
		const params = getUrlParams(window.location.href);

		if (params['type']) document.getElementById(CREATE_SELECT_FORM_ID(params['type']))?.click();
	});

	function createPost() {
		let _data = { ...data, selected: $formHook.selected.toLowerCase() };

		if (_data.selected === 'images') data.video = null;
		if (_data.selected === 'video') data.images = [];

		const check = preCheck__Post(data);

		if (check.type === 'error') {
			errorMessage = check.data;
			return;
		}

		_Create_Post({ ..._data, selected: $formHook.selected.toLowerCase() }).then((res) => {
			if (res.type === 'error') errorMessage = res.data;
			else goto(WEB_POST_URL(res.data, data.title));
		});
	}

	let data: Form_CreatePost = createDefaultCreatePostData();
	let formHook = useForm(data, 'select');
	let errorMessage: string = '';
</script>

<FormContainer
	{formHook}
	mode="select"
	formNames={['Text', 'Images', 'Video', 'Audio', 'Link']}
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
	<Form formTitle={'Audio'} formIndex={3} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(1)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<FileInput
			label="Audio"
			name="audio"
			expectedFile="audio"
			on:_input={(e) => {
				if (e.detail.files) data.audio = e.detail.files[0];
			}}
			on:validate={inputChange}
		/>
	</Form>
	<Form formTitle={'Link'} formIndex={4} let:inputChange>
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
			validators={[minLenValidator(1), linkValidator()]}
			bind:value={data.link}
			on:validate={inputChange}
		/>
	</Form>
</FormContainer>
