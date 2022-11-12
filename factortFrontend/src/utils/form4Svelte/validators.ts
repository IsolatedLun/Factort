import type { FileInputTypes } from '../../components/Modules/Interactibles/Inputs/types';
import { propOrDefault } from '../cubeCss/cubeCss';
import { URL_REGEX } from '../regex/all';
import { EMAIL_REGEX, FILE_TYPE_DICT } from './consts';
import type { Props_InputValidator } from './types';

export function minLenValidator(n: number): Props_InputValidator<never> {
	return {
		validate: (e: HTMLInputElement) => e.value.length > n - 1,
		errorText: `Must have atleast ${n} character(s).`
	};
}

export function emailValidator(): Props_InputValidator<never> {
	return {
		validate: (e: HTMLInputElement) => EMAIL_REGEX.test(e.value),
		errorText: `Must be a valid email. (example@gmail.com)`
	};
}

export function linkValidator(): Props_InputValidator<never> {
	return {
		validate: (e: HTMLInputElement) => URL_REGEX.test(e.value),
		errorText: `Must be a valid link/url. (https://www.google.com)`
	};
}

export function fileTypeValidator(type: string): Props_InputValidator<File> {
	return {
		validate: (e: HTMLInputElement | File) => {
			let file: File | null;

			if ('className' in e) file = e.files ? e.files[0] : null;
			else file = e;

			if (file) {
				const fileExtStart = file.name.lastIndexOf('.');
				let fileExtension = file.name.slice(fileExtStart);

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
export function specialCharacterValidator(characters: string[]): Props_InputValidator<never> {
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
// Utils
// ============================
export function createExceptedFileValidator(
	input: HTMLInputElement,
	expectedFile: FileInputTypes
): [string, Props_InputValidator<never> | null] {
	if (expectedFile === 'image') {
		const extenstions = FILE_TYPE_DICT['image'].join(', ');

		return [extenstions, fileTypeValidator('image')];
	}

	if (expectedFile === 'video') {
		const extenstions = FILE_TYPE_DICT['video'].join(', ');
		return [extenstions, fileTypeValidator('video')];
	}

	if (expectedFile === 'audio') {
		const extenstions = FILE_TYPE_DICT['audio'].join(', ');
		return [extenstions, fileTypeValidator('audio')];
	}

	return ['', null];
}
