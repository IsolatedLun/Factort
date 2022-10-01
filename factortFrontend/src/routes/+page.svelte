<script lang="ts">
	import FormContainer from '../components/Modules/Form/FormContainer.svelte';
	import Form from '../components/Modules/Form/Form.svelte';
	import TextInput from '../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { minLenValidator } from '../utils/form4Svelte/validators';
</script>

<FormContainer>
	<Form formTitle="Create account" let:inputChange>
		<TextInput
			label="Username"
			showLabel={true}
			on:validate={inputChange}
			validators={[minLenValidator(3)]}
		/>
		<TextInput label="Email" showLabel={true} on:validate={inputChange} />
		<TextInput label="Password" showLabel={true} on:validate={inputChange} />
	</Form>
	<Form formTitle="Create profile" formIndex={1} let:inputChange>
		<TextInput label="Username" showLabel={true} on:validate={inputChange} />
		<TextInput
			label="Email"
			showLabel={true}
			on:validate={inputChange}
			validators={[minLenValidator(3)]}
		/>
		<TextInput label="Password" showLabel={true} on:validate={inputChange} />
	</Form>
</FormContainer>
