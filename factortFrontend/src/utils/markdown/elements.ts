import { parseMarkdown } from './markdownParser';
import type { MKD_ParsedData, MKD_TreeItem } from './types';
import { GENERAL_IGNORE_LIST, HIDDEN_IGNORE_LIST, LINK_IGNORE_LIST } from './utils';

export function createHeadingElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string>) {
	let { result, data } = parsedData;

	return `<h${data.count}>${parseMarkdown(result, GENERAL_IGNORE_LIST)}</h${data.count}>`;
}

export function createAsteriskElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string>) {
	let { result, data } = parsedData;

	if (data.count === 3) return `<b><i>${parseMarkdown(result, GENERAL_IGNORE_LIST)}</i></b>`;
	if (data.count === 2) return `<b>${parseMarkdown(result, GENERAL_IGNORE_LIST)}</b>`;
	return `<i>${parseMarkdown(result, GENERAL_IGNORE_LIST)}</i>`;
}

export function createListElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string[]>) {
	let { result, data } = parsedData;
	let out = '';
	let tag = '';

	if (self.syntax === '-') tag = 'ul';
	else if (self.syntax === '=') tag = 'ol';

	out += `<${tag}>`;
	result?.forEach((item) => (out += `<li>${parseMarkdown(item, GENERAL_IGNORE_LIST)}</li>`));
	out += `</${tag}>`;

	return out;
}

export function createLinkElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string[2]>) {
	let { result, data } = parsedData;

	return `<a target={'_blank'} href="${result[1]}">${parseMarkdown(
		result[0],
		LINK_IGNORE_LIST
	)}</a>`;
}

export function createCodeElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string>) {
	let { result, data } = parsedData;

	return `<code>${parseMarkdown(result, GENERAL_IGNORE_LIST)}</code>`;
}

export function createHiddenElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string>) {
	let { result, data } = parsedData;

	const parsedResult = parseMarkdown(result, HIDDEN_IGNORE_LIST);
	return `<p class="[ spoiler ]" aria-label="${parsedResult}">${parsedResult}</p>`;
}
