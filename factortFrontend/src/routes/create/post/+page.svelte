<script lang="ts">
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { linkValidator, minLenValidator } from '../../../utils/form4Svelte/validators';
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
	import { onDestroy, onMount } from 'svelte';
	import {
		CREATE_SELECT_FORM_ID,
		MIN_CONTENT_LEN,
		MIN_TITLE_LEN,
		WEB_POST_URL
	} from '../../../consts';
	import { goto } from '$app/navigation';
	import { preCheck__Post } from '../../../utils/preChecks';
	import { parseMarkdown } from '../../../utils/markdown/markdownParser';
	import Boolean from '../../../components/Modules/Interactibles/Boolean.svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import { globalStore } from '../../../stores/global';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import SelectInput from '../../../components/Modules/Interactibles/Inputs/SelectInput.svelte';
	import { E_PostVisibilityTypes } from '../../../components/Layouts/Post/types';

	onDestroy(() => {
		globalStore.update((state) => ({
			...state,
			currentCommunity: null
		}));
	});

	onMount(() => {
		const params = getUrlParams(window.location.href);

		if (params['type']) document.getElementById(CREATE_SELECT_FORM_ID(params['type']))?.click();
	});

	function createPost() {
		let _data = { ...data, selected: $formHook.selected.toLowerCase() };

		// Don't forget to assign the newly changed data to _data
		if (_data.selected === 'images') data.video = null;
		if (_data.selected === 'video') data.images = [];
		if (_data.selected === 'text' && markdownMode) _data.content = parseMarkdown(data.content, []);
		if ($globalStore.currentCommunity) _data.community_id = $globalStore.currentCommunity.id;

		const check = preCheck__Post(data);

		if (check.type === 'error') {
			errorMessage = check.data;
			return;
		}

		// HTML content is sanitized on the backend
		_Create_Post({ ..._data, selected: $formHook.selected.toLowerCase() }).then((res) => {
			if (res.type === 'error') errorMessage = res.data;
			else goto(WEB_POST_URL(res.data, data.title));
		});
	}

	let data: Form_CreatePost = createDefaultCreatePostData();
	let formHook = useForm(data, 'select');
	let errorMessage: string = '';

	let markdownMode = false;
</script>

<FormContainer
	{formHook}
	mode="select"
	formNames={['Text', 'Images', 'Video', 'Audio', 'Link']}
	{errorMessage}
	on:submit={createPost}
>
	{#if $globalStore.currentCommunity}
		<div class="[ grid place-items-center margin-block-1 ]">
			<Card variant="dark" cubeClass={{ utilClass: 'text-center' }} padding={1}>
				Post For:
				<DynamicLabel props={{ type: 'community', data: $globalStore.currentCommunity }} />
			</Card>
		</div>
	{/if}
	<Form formTitle={'Text'} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(MIN_TITLE_LEN)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<TextArea
			label="Content"
			showLabel={true}
			validators={[minLenValidator(MIN_CONTENT_LEN)]}
			bind:value={data.content}
			on:validate={inputChange}
		/>
		<Boolean
			name="markdownToggler"
			type="checkbox"
			label="Markdown mode"
			bind:value={markdownMode}
		/>

		{#if markdownMode}
			<TypoHeader underline={true} spacing={0}>Result</TypoHeader>
			<article class="[ markdown ] [  ]">
				{@html parseMarkdown(data.content, [])}
			</article>
		{/if}
	</Form>
	<Form formTitle={'Images'} formIndex={1} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(MIN_TITLE_LEN)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<FormImagesSlot on:change={inputChange} on:images={(e) => (data.images = e.detail)} />
	</Form>
	<Form formTitle={'Video'} formIndex={2} let:inputChange>
		<TextInput
			label="Title"
			showLabel={true}
			validators={[minLenValidator(MIN_TITLE_LEN)]}
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
			validators={[minLenValidator(MIN_TITLE_LEN)]}
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
			validators={[minLenValidator(MIN_TITLE_LEN)]}
			bind:value={data.title}
			on:validate={inputChange}
		/>
		<TextInput
			label="Link"
			placeholder="Enter link"
			showLabel={true}
			validators={[minLenValidator(1), linkValidator()]}
			bind:value={data.link}
			on:validate={inputChange}
		/>
	</Form>

	<SelectInput
		label="Visibility"
		options={[
			{ name: 'Public', value: E_PostVisibilityTypes.PUBLIC },
			{ name: 'Unlisted', value: E_PostVisibilityTypes.UNLISTED },
			{ name: 'Private', value: E_PostVisibilityTypes.PRIVATE }
		]}
		bind:value={data.visibility}
		cubeClass={{ utilClass: 'margin-block-start-1' }}
	/>
</FormContainer>
