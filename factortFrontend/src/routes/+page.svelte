<script lang="ts">
	import FormContainer from '../components/Modules/Form/FormContainer.svelte';
	import Form from '../components/Modules/Form/Form.svelte';
	import TextInput from '../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import {
		emailValidator,
		minLenValidator,
		specialCharacterValidator
	} from '../utils/form4Svelte/validators';
	import FileInput from '../components/Modules/Interactibles/Inputs/FileInput.svelte';
</script>

<FormContainer>
	<Form formTitle="Create account" let:inputChange>
		<TextInput
			label="Username"
			showLabel={true}
			on:validate={inputChange}
			validators={[minLenValidator(1)]}
		/>
		<TextInput
			label="Email"
			type={'email'}
			showLabel={true}
			on:validate={inputChange}
			validators={[minLenValidator(1), emailValidator()]}
		/>
		<TextInput
			label="Password"
			type={'password'}
			showLabel={true}
			on:validate={inputChange}
			validators={[minLenValidator(7), specialCharacterValidator(['#', '$', '!', '-'])]}
		/>
	</Form>
	<Form formTitle="Create profile" formIndex={1} let:inputChange>
		<FileInput expectedFile="image" label="Profile" on:validate={inputChange} />
		<!-- Add option to draw a profile :) -->
	</Form>
</FormContainer>
