import type { KeyValue } from '../../types';
import type { Props_InputValidationResult, Props_InputValidator } from './types';

export function createInputIdWithLabel(label: string) {
	return label + '-input';
}

/**
 * @param form
 * @summary Selects all of the inputs in a form and stores them in a dict. { inputId: bool}
 * The boolean is used to know whether or not of the input is valid
 */
export function bundleInputs(formTitle: string) {
	const form = document.getElementById(formTitle + '-form') as HTMLFormElement;
	const inputs = form.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
	let output: KeyValue<boolean> = {};

	inputs.forEach((input) => (output[input.id] = false));

	return output;
}

export function validateInput(
	input: HTMLInputElement,
	validators: Props_InputValidator[]
): Props_InputValidationResult {
	let bools: boolean[] = [];
	let errors: string[] = [];

	if (validators.length === 0) return { errors, isValid: true };

	validators.forEach((validator) => {
		const res = validator.validate(input);

		if (res) bools.push(true);
		else {
			errors.push(validator.errorText);
			bools.push(false);
		}
	});

	return { errors, isValid: bools.every(Boolean) };
}
