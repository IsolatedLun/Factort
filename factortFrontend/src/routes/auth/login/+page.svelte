<script lang="ts">
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import {
		emailValidator,
		minLenValidator,
		specialCharacterValidator
	} from '../../../utils/form4Svelte/validators';
	import { _Login_View, _Register_View } from '../../../services/auth/authService';
	import type { Form_Login } from '../types';
	import { createDefaultLoginData } from '../../../utils/defaultProps';
	import Form from '../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../components/Modules/Form/FormContainer.svelte';
	import { useForm } from '../../../stores/formStore/form-store';
	import { setTokens } from '../../../utils/tokenHandler';
	import { globalStore } from '../../../stores/global';

	function loginView() {
		_Login_View(data).then((res) => {
			if (res.type === 'error') errorMessage = res.data;
			else {
				setTokens(res.data.tokens);
				globalStore.update((state) => ({ ...state, user: res.data.user, isLogged: true }));
			}
		});
	}

	let data: Form_Login = createDefaultLoginData();
	let errorMessage = '';
	let formHook = useForm(data, 'counter');
</script>

<FormContainer {formHook} mode="counter" {errorMessage} on:submit={loginView}>
	<Form formTitle="Login" let:inputChange>
		<TextInput
			label="Email Address"
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
</FormContainer>
