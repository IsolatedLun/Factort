import type { FileInputTypes } from '../../components/Modules/Interactibles/Inputs/types';
import { propOrDefault } from '../cubeCss/cubeCss';
import { EMAIL_REGEX, FILE_TYPE_DICT } from './consts';
import type { Props_InputValidator } from './types';

export function minLenValidator(n: number): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => e.value.length > n - 1,
		errorText: `Must have atleast ${n} character(s).`
	};
}

export function emailValidator(): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => EMAIL_REGEX.test(e.value),
		errorText: `Must be a valid email. (example@gmail.com)`
	};
}

export function fileTypeValidator(type: string): Props_InputValidator {
	return {
		validate: (e: HTMLInputElement) => {
			const file = e.files ? e.files[0] : null;

			if (file) {
				let fileExtension = file.name.split('.')[1];
				if (!fileExtension.startsWith('.'))
					// always needs to have a . at the start
					fileExtension = '.' + fileExtension;

				// We validate this way to reduce code and improve flexibility
				return FILE_TYPE_DICT[type].includes(fileExtension);
			}

			return false;
		},
		errorText: `Must be a file of type "${type}". (${propOrDefault(
			FILE_TYPE_DICT[type].join(', '),
			'Invalid file'
		)})`
	};
}

/**
 * @param characters - An array of special characters => [$, #]
 */
export function specialCharacterValidator(characters: string[]): Props_InputValidator {
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

// ============================
// Customized validators
// ============================
export function createExceptedFileValidator(
	input: HTMLInputElement,
	expectedFile: FileInputTypes
): [string, Props_InputValidator | null] {
	if (expectedFile === 'image') {
		const extenstions = FILE_TYPE_DICT['image'].join(', ');

		return [extenstions, fileTypeValidator('image')];
	}

	if (expectedFile === 'video') {
		const extenstions = FILE_TYPE_DICT['video'].join(', ');
		return [extenstions, fileTypeValidator('video')];
	}

	return ['', null];
}
