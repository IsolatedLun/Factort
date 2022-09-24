import type { MKD_ParsedData, MKD_TreeItem } from './types';

export function createHeadingElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string>) {
	let { result, data } = parsedData;

	return `<h${data.count}>${result}</h${data.count}>`;
}

export function createAsteriskElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string>) {
	let { result, data } = parsedData;

	if (data.count === 3) return `<b><i>${result}</i></b>`;
	if (data.count === 2) return `<b>${result}</b>`;
	return `<i>${result}</i>`;
}

export function createListElement(self: MKD_TreeItem, parsedData: MKD_ParsedData<string[]>) {
	let { result, data } = parsedData;
	let out = '';
	let tag = '';

	if (self.syntax === '-') tag = 'ul';
	else if (self.syntax === '=') tag = 'ol';

	out += `<${tag}>`;
	result?.forEach((item) => (out += `<li>${item}</li>`));
	out += `</${tag}>`;

	return out;
}

export function createLinkElement(
	self: MKD_TreeItem,
	parsedData: MKD_ParsedData<[string, string]>
) {
	let { result, data } = parsedData;

	return `<a href=${result[1]}>${result[0]}</a>`;
}
