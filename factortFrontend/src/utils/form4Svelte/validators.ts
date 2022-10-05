import type { Props_InputValidators } from '../../components/Modules/Interactibles/Inputs/types';
import { EMAIL_REGEX } from './consts';

export function minLenValidator(n: number): Props_InputValidators {
	return {
		validate: (e: HTMLInputElement) => e.value.length > n - 1,
		errorText: `Must have atleast ${n} character(s).`
	};
}

export function emailValidator(): Props_InputValidators {
	return {
		validate: (e: HTMLInputElement) => EMAIL_REGEX.test(e.value),
		errorText: `Must be a valid email. (example@gmail.com)`
	};
}

/**
 * @param characters - An array of special characters => [$, #]
 */
export function specialCharacterValidator(characters: string[]): Props_InputValidators {
	return {
		validate: (e: HTMLInputElement) => {
			const value = e.value;

			for (let i = 0; i < value.length; i++) {
				if (characters.includes(value[i])) return true;
			}

			return false;
		},
		errorText: `Must contain atleast one of these (${characters.join(', ')}) character(s).`
	};
}
