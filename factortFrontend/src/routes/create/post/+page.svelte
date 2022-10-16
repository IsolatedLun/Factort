<script>
	import Form from '../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../components/Modules/Form/FormContainer.svelte';
	import TextArea from '../../../components/Modules/Interactibles/Inputs/TextArea.svelte';
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { useForm } from '../../../stores/formStore/form-store';
	import { ICON_LINK } from '../../../consts';
	import PostMediaForm from './_/Post_MediaForm.svelte';

	const mainFormHook = useForm('select');
	const mediaFormHook = useForm('select');
</script>

<FormContainer formHook={mainFormHook} mode={['Text', 'Media', 'Link']}>
	<Form formTitle="Text post" let:inputChange>
		<TextInput label="Title" placeholder="Enter title" showLabel={true} on:validate={inputChange} />
		<TextArea
			inputCubeClass={{ utilClass: 'width-min-100 resize-vertical' }}
			label="Content"
			placeholder="Enter content"
			on:validate={inputChange}
		/>
	</Form>

	<PostMediaForm {mediaFormHook} />

	<Form formTitle="Link post" formIndex={2} let:inputChange>
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
