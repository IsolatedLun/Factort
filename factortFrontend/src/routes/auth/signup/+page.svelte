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
	import { preCheck__SignUp } from '../../../utils/preChecks';
	import { goto } from '$app/navigation';
	import { WEB_DRAWER_URL, WEB_LOGIN_URL } from '../../../consts';

	function registerView() {
		preCheck__SignUp(data);

		const check = preCheck__SignUp(data);

		if (check.type === 'error') {
			errorMessage = check.data;
			return;
		}

		_Register_View(data).then((res) => {
			if (res.type === 'error') errorMessage = res.data;
			else goto(WEB_LOGIN_URL);
		});
	}

	let data: Form_Signup = createDefaultSignUpData();
	let formHook = useForm(data, 'counter');
	let errorMessage = '';
</script>

<FormContainer {formHook} {errorMessage} mode="counter" on:submit={registerView}>
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
			bind:value={data.email_address}
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
		<FileInput
			label="Profile"
			name="profile"
			expectedFile="image"
			styling="square-image"
			centerSelf={true}
			on:_input={(e) => (data.profile = e.detail.files ? e.detail.files[0] : null)}
			on:validate={inputChange}
		/>

		<a class="[ width-max-content ]" href={WEB_DRAWER_URL}>Draw your profile</a>
	</Form>

	<a class="[ margin-block-start-2 display-inline-block ]" data-bright href={WEB_LOGIN_URL}
		>Already have an account?</a
	>
</FormContainer>
