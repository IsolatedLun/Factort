<script lang="ts">
	import FormContainer from '../components/Modules/Form/FormContainer.svelte';
	import Form from '../components/Modules/Form/Form.svelte';
	import TextInput from '../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import Button from '../components/Modules/Interactibles/Buttons/Button.svelte';
</script>

<FormContainer>
	<Form formTitle="Create account">
		<TextInput label="Username" showLabel={true} />
		<TextInput label="Email" showLabel={true} />
		<TextInput label="Password" showLabel={true} />
	</Form>
	<Form formTitle="Create profile" formIndex={1}>
		<TextInput label="Username" showLabel={true} />
		<TextInput label="Email" showLabel={true} />
		<TextInput label="Password" showLabel={true} />
	</Form>
</FormContainer>
