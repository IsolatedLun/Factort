<script>
	import Form from '../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../components/Modules/Form/FormContainer.svelte';
	import TextArea from '../../../components/Modules/Interactibles/Inputs/TextArea.svelte';
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { useForm } from '../../../stores/formStore/form-store';
	import { ICON_LINK } from '../../../consts';
	import PostImageForm from './_/Post_ImageForm.svelte';
	import PostVideoForm from './_/Post_VideoForm.svelte';

	const mainFormHook = useForm('select');
</script>

<FormContainer formHook={mainFormHook} mode={['Text', 'Image', 'Video', 'Link']}>
	<Form formTitle="Text" let:inputChange>
		<TextInput label="Title" placeholder="Enter title" showLabel={true} on:validate={inputChange} />
		<TextArea
			inputCubeClass={{ utilClass: 'width-min-100 resize-vertical' }}
			label="Content"
			placeholder="Enter content"
			on:validate={inputChange}
		/>
	</Form>

	<PostImageForm mediaFormHook={mainFormHook} />

	<PostVideoForm mediaFormHook={mainFormHook} />

	<Form formTitle="Link" formIndex={3} let:inputChange>
		<TextInput label="Title" placeholder="Enter title" showLabel={true} on:validate={inputChange} />
		<TextInput
			label="Link"
			placeholder="Enter link"
			showLabel={true}
			endIcon={ICON_LINK}
			on:validate={inputChange}
		/>
	</Form>
</FormContainer>
