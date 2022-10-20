import { BIT_COUNTS, CREATE_YOUTUBE_IFRAME } from '../consts';
import { youtubeLinkRegex } from './regex/youtubeRegex';
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

export function sizeConvert(
	size: number,
	input: StorageSizes,
	output: StorageSizes,
	precision = 2
): number {
	if (input === output) return size;
	return Number(((size * BIT_COUNTS[input]) / BIT_COUNTS[output]).toFixed(2));
}
