import { FILE_SIZE_SYMBOLS } from '../../consts';
import type { FileInputTypes } from '../../components/Modules/Interactibles/Inputs/types';
import { propOrDefault } from '../cubeCss/cubeCss';
import { sizeConvert } from '../misc';
import { URL_REGEX } from '../regex/all';
import type { StorageSizes } from '../types';
import { EMAIL_REGEX, FILE_TYPE_DICT } from './consts';
import type { Props_FileSizeEquation, Props_InputValidator } from './types';

/**
 * @param n
 */
export function minLenValidator(n: number): Props_InputValidator<never> {
	return {
		validate: (e: HTMLInputElement) => e.value.length > n - 1,
		errorText: `Must have atleast ${n} character(s).`
	};
}

/**
 * @param n
 */
export function maxLenValidator(n: number): Props_InputValidator<never> {
	return {
		validate: (e: HTMLInputElement) => e.value.length < n - 1,
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
		validate: (e: HTMLInputElement) => {
			console.log(null);
			return URL_REGEX.test(e.value);
		},
		errorText: `Must be a valid link/url. (https://www.google.com)`
	};
}

/**
 * @param type
 */
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

/**
 * @param size - The size value in (kb, mb, ...)
 * @param i - Input size unit
 * @param o - Output size unit
 * @param eqx - Min and Max values (Size unit must be of that of the output)
 *
 * @note Both 'i' and 'o' can be the same
 */
export function fileSizeValidator(
	size: number,
	i: StorageSizes,
	o: StorageSizes,
	eqx: Props_FileSizeEquation
): Props_InputValidator<never> {
	const newSize = sizeConvert(size, i, o);
	const symbol = FILE_SIZE_SYMBOLS[o];

	return {
		validate: (e: HTMLInputElement) => {
			const file = e.files ? e.files[0] : null;

			if (file) {
				if (eqx.max && eqx.min) return eqx.min < newSize && newSize < eqx.max;
				else if (eqx.min) return eqx.min < newSize;
				else if (eqx.max) return newSize < eqx.max;
			}

			return false;
		},
		errorText: `File size must be between ${eqx.min}${symbol} and ${eqx.max}${symbol}.`
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
