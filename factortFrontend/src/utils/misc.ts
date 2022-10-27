import type { KeyValue } from 'src/types';
import { BIT_COUNTS, CREATE_YOUTUBE_IFRAME } from '../consts';
import { youtubeLinkRegex } from './regex/all';
import type { StorageSizes } from './types';

/**
 * @param url
 * @summary Separates the youtube uuid substring from the url and returns a iframe element
 */
export function createIframeElement(url: string): string {
	let uuid = (url.match(youtubeLinkRegex) as [string, string, string])[2];
	if (uuid.startsWith('watch?v=')) uuid = uuid.replace('watch?v=', '');

	const link = 'https://www.youtube.com/embed/' + uuid;
	return CREATE_YOUTUBE_IFRAME(link);
}

/**
 * @param obj
 * @summary Returns the length of an object
 */
export function objLen(obj: object): number {
	return Object.keys(obj).length;
}

/**
 * @param size
 * @param input
 * @param output
 * @param precision - Decimal places
 * @summary Converts a size into another size (MB->GB), etc.
 */
export function sizeConvert(
	size: number,
	input: StorageSizes,
	output: StorageSizes,
	precision = 2
): number {
	if (typeof size !== 'number') return 0;

	if (input === output) return size;
	return Number(((size * BIT_COUNTS[input]) / BIT_COUNTS[output]).toFixed(precision));
}

/**
 * @param url
 * @summary Returns a dictionary of a urls's parameters
 */
export function getUrlParams(url: string): KeyValue<string> {
	let res: KeyValue<string> = {};

	// https://www.google.com/home?query=name&query2=name2
	try {
		url
			.split('?')[1] // query=name&query2=name2
			.split('&') // query=name, query2=name2
			.forEach((keyVal) => {
				const [key, val] = keyVal.split('=');
				res[key] = val; // query: name, query2: name2
			});
	} catch {}

	return res;
}
