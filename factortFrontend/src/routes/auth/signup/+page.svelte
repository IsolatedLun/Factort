<script lang="ts">
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import {
		emailValidator,
		minLenValidator,
		specialCharacterValidator
	} from '../../../utils/form4Svelte/validators';
	import { _Register_View } from '../../../services/auth/authService';
	import FileInput from '../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import type { Form_Signup } from '../types';
	import { createDefaultSignUpData } from '../../../utils/defaultProps';
	import Form from '../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../components/Modules/Form/FormContainer.svelte';
	import { useForm } from '../../../stores/formStore/form-store';

	let data: Form_Signup = createDefaultSignUpData();
	let formHook = useForm(data, 'counter');
</script>

<FormContainer {formHook} mode="counter">
	<Form formTitle={'Basic Information'} let:inputChange>
		<TextInput
			label="Username"
			bind:value={data.username}
			showLabel={true}
			validators={[minLenValidator(1)]}
			on:validate={inputChange}
		/>
		<TextInput
			label="Email"
			type={'email'}
			showLabel={true}
			bind:value={data.email}
			validators={[minLenValidator(5), emailValidator()]}
			on:validate={inputChange}
		/>
		<TextInput
			label="Password"
			type={'password'}
			showLabel={true}
			bind:value={data.password}
			validators={[minLenValidator(7), specialCharacterValidator(['#', '$', '!', '-'])]}
			on:validate={inputChange}
		/>
	</Form>
	<Form formTitle={'Profile'} formIndex={1} let:inputChange>
		<div class="[ margin-inline-auto ]">
			<FileInput
				label="Profile"
				name="profile"
				expectedFile="image"
				styling="square-image"
				on:validate={inputChange}
			/>
		</div>
	</Form>
</FormContainer>
