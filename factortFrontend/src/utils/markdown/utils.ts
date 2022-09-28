import type { MKD_TreeItemWithVariants } from './types';

/**
 * @param markdownText
 * @param treeItem
 * @summary Parses a syntax and combines all enclosers and return it, if a variant is found
 * @example
 * str = '[hello]{word}(lol)', variants = '["[]+{}+()", "[]+()"]'
 * findSyntaxVariant(str, variants) => "[]+{}+()"
 */
export function findSyntaxVariant(
	markdownText: string,
	treeItem: MKD_TreeItemWithVariants
): string {
	const variants = Object.keys(treeItem.variants);

	for (let i = 0; i < variants.length; i++) {
		const enclosers = variants[i].split('+');
		let variant = '';

		let prevEncloser = '';
		for (let j = 0; j < enclosers.length; j++) {
			let [startEncloser, endEncloser] = enclosers[j].split('');

			// Checks if for example, ] is not before [
			if (markdownText.indexOf(startEncloser) < markdownText.indexOf(endEncloser)) {
				// Checks if there is a space between the end and start of different enclosers
				// []() => allowed
				// [] () => not allowed
				if (
					prevEncloser &&
					markdownText.indexOf(prevEncloser) + 1 < markdownText.indexOf(startEncloser)
				)
					return '';

				if (j > 0) variant += '+';
				variant += startEncloser + endEncloser;

				prevEncloser = endEncloser;
			}
		}

		if (treeItem.variants[variant]) return variant;
	}

	return '';
}

// Ignore lists
export const GENERAL_IGNORE_LIST = ['#', '-', '='];
export const HEADING_IGNORE_LIST = GENERAL_IGNORE_LIST;
export const LIST_IGNORE_LIST = GENERAL_IGNORE_LIST;
export const LINK_IGNORE_LIST = [...GENERAL_IGNORE_LIST, '['];
export const HIDDEN_IGNORE_LIST = [...GENERAL_IGNORE_LIST, '[', '`'];
export const CODE_IGNORE_LIST = GENERAL_IGNORE_LIST;
