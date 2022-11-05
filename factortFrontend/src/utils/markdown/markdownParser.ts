import type { KeyValue } from 'src/types';
import { COMPLEMENTARIES, TEXTAREA_TAB_SIZE } from '../../consts';
import { createDefaultParsedData } from '../defaultProps';
import {
	createAsteriskElement,
	createCodeElement,
	createHeadingElement,
	createHiddenElement,
	createLinkElement,
	createListElement
} from './elements';
import type { MKD_ParsedData, MKD_TreeItem, MKD_TreeItemWithVariants } from './types';
import { findSyntaxVariant } from './utils';

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
		options: { mode: 'normal' },
		parser: parseMarkdownList,
		formatter: createListElement
	},
	'=': {
		syntax: '=',
		options: { mode: 'normal' },
		parser: parseMarkdownList,
		formatter: createListElement
	},
	'`': {
		syntax: '`+/`',
		options: { mode: 'normal' },
		parser: parseStartEnd,
		formatter: createCodeElement
	},

	'[': {
		variants: {
			'[]+()': {
				syntax: '[]+()',
				options: { mode: 'normal' },
				parser: parseComplementary,
				formatter: createLinkElement
			}
		}
	},

	'{': {
		syntax: '{+}',
		options: { mode: 'normal' },
		parser: parseStartEnd,
		formatter: createHiddenElement
	}
} as KeyValue<MKD_TreeItem | MKD_TreeItemWithVariants>;

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

	while (i < markdownText.length) {
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
			let treeItem = MARKDOWN_TREE[chr];
			let _res = createDefaultParsedData();

			if ('variants' in treeItem) {
				const variant = findSyntaxVariant(markdownText, treeItem);

				if (variant && treeItem.variants[variant]) {
					treeItem = treeItem.variants[variant];
					_res = treeItem.parser(markdownText.slice(i), treeItem);
				}
			} else {
				_res = treeItem.parser(markdownText.slice(i), treeItem);
			}

			if (_res.result && !('variants' in treeItem)) {
				out += treeItem.formatter(treeItem, _res);
				i += _res.data.offset;
			} else {
				out = markdownText;
				i += markdownText.length;
			}
		} else {
			if (chr === '\t') out += '&nbsp;'.repeat(TEXTAREA_TAB_SIZE);
			out += chr;
			i++;
		}
	}

	// We replace all newlines into <br>'s because we cannot detect newlines if they are inside tags
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
	let [start, end] = [1, subText.indexOf(syntaxEnd)];

	if (end === -1) return createDefaultParsedData<string>();

	if (self.options.mode === 'count') while (subText[start] === sytaxStart) start++;

	return { result: subText.slice(start, end), data: { count: start, offset: end + 2 } };
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
	let offset = 0;
	while (dud < encloserAmt) {
		let currEncloser = self.syntax.split('+')[dud][0];

		let start = subText.indexOf(currEncloser);
		let end = subText.indexOf(COMPLEMENTARIES[currEncloser]);

		if (end !== -1 && start !== -1) {
			items.push(subText.slice(start + 1, end).trim());

			offset += items[dud].length + 2;
		} else {
			return createDefaultParsedData<string[]>();
		}

		dud++;
	}

	return { result: items, data: { count: 0, offset } };
}
