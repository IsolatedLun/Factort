import type { KeyValue } from 'src/types';
import { COMPLEMENTARIES } from '../../consts';
import { createDefaultParsedData } from '../defaultProps';
import {
	createAsteriskElement,
	createHeadingElement,
	createLinkElement,
	createListElement
} from './elements';
import type { MKD_ParsedData, MKD_TreeItem } from './types';

const MARKDOWN_TREE = {
	'#': {
		syntax: '#+/#',
		options: { mode: 'count' },
		parser: parseStartEnd,
		formatter: createHeadingElement
	},
	'*': {
		syntax: '*+/*',
		options: { mode: 'count' },
		parser: parseStartEnd,
		formatter: createAsteriskElement
	},
	'-': {
		syntax: '-',
		options: { mode: 'neighbours' },
		parser: parseMarkdownList,
		formatter: createListElement
	},
	'=': {
		syntax: '=',
		options: { mode: 'neighbours' },
		parser: parseMarkdownList,
		formatter: createListElement
	},
	'[': {
		syntax: '[]+()',
		options: { mode: 'complementary' },
		parser: parseComplementary,
		formatter: createLinkElement
	}
} as KeyValue<MKD_TreeItem>;

/**
 * @param markdownText
 * @param ignores - A list of character for the parser to ignore
 * @summary A simple markdown parser that works with numerous synatexes.
 *
 * @note Can be used to parse inside of tags too, but you should add the tag to the ingores list[]
 * 	to avoid infinite recursions.
 */
export function parseMarkdown(markdownText: string, ignores: string[]): string {
	let out = '';
	let i = 0;

	while (!(i > markdownText.length - 1)) {
		let chr = markdownText[i];

		if (ignores.includes(chr)) {
			out += chr;
			i++;

			continue;
		}

		// Escape characters
		if (chr === '\\' && i + 1 < markdownText.length) {
			out += markdownText[i + 1];
			i += 2;

			continue;
		}

		if (MARKDOWN_TREE[chr]) {
			const res = MARKDOWN_TREE[chr].parser(markdownText.slice(i), MARKDOWN_TREE[chr]);
			if (res.result) out += MARKDOWN_TREE[chr].formatter(MARKDOWN_TREE[chr], res);

			i += res.data.offset + 1;
		} else {
			out += chr;

			i++;
		}
	}

	// We replace all newlines into <br>'s because we cannot detect newlines if they are inside tags
	// (when parsing)
	out = out.replaceAll(/\r?\n/g, '<br data-newline="true" />');
	return out;
}

// ===================================
// Dynamic Parsers
// ===================================

/**
 * @param subText
 * @summary A parser that works with an start/end syntax, supports counting.
 * `#### Enter Text /# => <h4>Enter Text</h4>`
 */
function parseStartEnd(subText: string, self: MKD_TreeItem): MKD_ParsedData<string> {
	const [sytaxStart, syntaxEnd] = self.syntax.split('+');
	let [start, end] = [0, subText.indexOf(syntaxEnd)];

	if (end === -1) createDefaultParsedData<string>();

	if (self.options.mode === 'count') while (subText[start] === sytaxStart) start++;

	return { result: subText.slice(start, end), data: { count: start, offset: end + 1 } };
}

/**
 * @param subText
 * @summary A markdown list parser. - Hello \n - World => <ul><li>Hello</li><li>World</li></ul>
 */
function parseMarkdownList(subText: string, self: MKD_TreeItem): MKD_ParsedData<string[]> {
	function partitionList(): [string[], number] {
		const items = subText.split('\n');
		let listItems = [];
		let offset = 0;

		for (let i = 0; i < items.length; i++) {
			if (items[i].startsWith(self.syntax)) {
				listItems.push(items[i].slice(1).trim());
				offset += items[i].length + 1;
			} else {
				break;
			}
		}

		return [listItems, Math.max(offset, 1)];
	}

	const [listElements, offset] = partitionList();

	return { result: listElements, data: { count: 0, offset } };
}

/**
 * @param subText
 * @summary A markdown complementary parser. `[Minecraft](https://www.google.com) =>
 * <a href="https://www.google.com">Minecraft</a>`
 */
function parseComplementary(subText: string, self: MKD_TreeItem): MKD_ParsedData<string[]> {
	let encloserAmt = self.syntax.split('+').length;
	let items = [];

	let dud = 0;
	let i = 1;
	let offset = 0;
	while (dud < encloserAmt) {
		let currEncloser = self.syntax.split('+')[dud][0];
		let end = subText.indexOf(COMPLEMENTARIES[currEncloser]);

		if (end !== -1) {
			items.push(subText.slice(i, end).trim());

			offset += items[dud].length + 1;
			i = end + 1;
		} else {
			return createDefaultParsedData<string[]>();
		}

		dud++;
	}

	return { result: items, data: { count: 0, offset } };
}
