<script lang="ts">
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { minLenValidator } from '../../../utils/form4Svelte/validators';
	import FileInput from '../../../components/Modules/Interactibles/Inputs/FileInput.svelte';
	import { createDefaultCreateCommunityData } from '../../../utils/defaultProps';
	import Form from '../../../components/Modules/Form/Form.svelte';
	import FormContainer from '../../../components/Modules/Form/FormContainer.svelte';
	import { useForm } from '../../../stores/formStore/form-store';
	import TextArea from '../../../components/Modules/Interactibles/Inputs/TextArea.svelte';
	import { WEB_COMMUNITY_URL } from '../../../consts';
	import { goto } from '$app/navigation';
	import type { Form_CreateCommunity } from '../types';
	import { _Create_Community } from '../../../services/create/CreateCommunityFetchers';
	import { preCheck_Community } from '../../../utils/preChecks';

	function createCommunity() {
		let _data = { ...data };

		const check = preCheck_Community(data);

		if (check.type === 'error') {
			errorMessage = check.data;
			return;
		}

		// HTML content is sanitized on the backend
		_Create_Community(_data).then((res) => {
			if (res.type === 'error') errorMessage = res.data;
			else goto(WEB_COMMUNITY_URL(res.data, data.name));
		});
	}

	let data: Form_CreateCommunity = createDefaultCreateCommunityData();
	let formHook = useForm(data, 'counter');
	let errorMessage: string = '';
</script>

<FormContainer {formHook} mode="counter" {errorMessage} on:submit={createCommunity}>
	<Form formTitle={'Basic information'} let:inputChange>
		<TextInput
			label="Name"
			showLabel={true}
			validators={[minLenValidator(1)]}
			bind:value={data.name}
			on:validate={inputChange}
		/>
		<TextArea
			label="About"
			showLabel={true}
			validators={[minLenValidator(5)]}
			bind:value={data.about}
			on:validate={inputChange}
		/>
		<div class="[ margin-inline-auto ]">
			<FileInput
				label="Profile"
				expectedFile="image"
				styling="square-image"
				on:_input={(e) => {
					if (e.detail.files) data.profile = e.detail.files[0];
				}}
				on:validate={inputChange}
			/>
		</div>
	</Form>
	<Form formTitle={'Banner'} formIndex={1} let:inputChange>
		<div class="[ width-100 ]">
			<FileInput
				label="Banner"
				expectedFile="image"
				styling="banner-image"
				on:_input={(e) => {
					if (e.detail.files) data.banner = e.detail.files[0];
				}}
				on:validate={inputChange}
			/>
		</div>
	</Form>
</FormContainer>
