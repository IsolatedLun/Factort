/**
 * @param markdownText
 * @summary A simple markdown parser that works with a start/end tag like syntax.
 */
export function parseMarkdown(markdownText: string) {
	let out = '';
	let i = 0;

	while (!(i > markdownText.length - 1)) {
		let chr = markdownText[i];

		if (chr === '#') {
			const res = parseMarkdownHeading(markdownText.slice(i));

			out += res[0];
			i += res[1];
		} else if (chr === '-') {
			const res = parseMarkdownList(markdownText.slice(i));

			out += res[0];
			i += res[1];
		} else if (chr === '*') {
			const res = parseMarkdownAsterisks(markdownText.slice(i));

			out += res[0];
			i += res[1];
		} else if (chr === '[') {
			const res = parseMarkdownLink(markdownText.slice(i));

			out += res[0];
			i += res[1];
		} else {
			out += chr;
		}

		i++;
	}

	// We replace all newlines into <br>'s because we cannot detect newlines if they are inside tags
	// (when parsing)
	out = out.replaceAll(/\r?\n/g, '<br data-newline="true" />');
	return out;
}

// ===================================
// Element Parsers
// ===================================

/**
 * @param subText
 * @summary A markdown heading parser. #### Enter Text /# => <h4>Enter Text</h4>
 */
function parseMarkdownHeading(subText: string): [string, number] {
	let start = 0;
	let end = subText.indexOf('/#');

	if (end === -1) return ['', 0];

	while (subText[start] == '#') start++;

	return [`<h${start}>${subText.slice(start, end)}</h${start}>`, end + 1];
}

/**
 * @param subText
 * @summary A markdown asterisks parser for (italic/bold/bold+italic). ** Enter Text /* => <b>Enter Text</b>
 */
function parseMarkdownAsterisks(subText: string): [string, number] {
	let start = 0;

	while (subText[start] == '*') start += 1;

	let end = subText.indexOf('/*');
	if (end == -1) return ['', 0];

	let tag = 'b';
	if (start === 3) {
		tag = 'em';

		return [`<b><${tag}>${subText.slice(start, end)}</${tag}></b>`, end + 1];
	} else if (start === 1) {
		tag = 'i';
	}

	return [`<${tag}>${subText.slice(start, end)}</${tag}>`, end + 1];
}

/**
 * @param subText
 * @summary A markdown list parser. - Hello \n - World => <ul><li>Hello</li><li>World</li></ul>
 */
function parseMarkdownList(subText: string): [string, number] {
	function partitionList(): [string[], number] {
		const items = subText.split('\n');
		let listItems = [];
		let offset = 0;

		for (let i = 0; i < items.length; i++) {
			if (items[i].startsWith('-')) {
				listItems.push(items[i]);
				offset += items[i].length;
			} else {
				break;
			}
		}

		return [listItems, offset];
	}

	let out = '';
	const [listElements, offset] = partitionList();

	out += '<ul>';
	listElements.forEach((listElement) => (out += `<li>${listElement.slice(1).trim()}</li>`));
	out += '</ul>';

	return [out, offset];
}

/**
 * @param subText
 * @summary A markdown link parser. [Minecraft](https://www.google.com) =>
 * <a href="https://www.google.com">Minecraft</a>
 */
function parseMarkdownLink(subText: string): [string, number] {
	function parseLinkName(): [string, number] {
		let end = subText.indexOf(']');

		if (end == -1) return ['', 0];
		return [subText.slice(1, end), end];
	}

	function parseLinkUrl(_subText: string): [string, number] {
		let start = subText.indexOf('(');
		let end = subText.indexOf(')');

		if (end === -1 || start === -1) return ['', 0];
		return [subText.slice(start + 1, end), end];
	}

	let [linkName, _offset] = parseLinkName();
	let [linkUrl, __offset] = parseLinkUrl(subText.slice(_offset));

	if (!(linkName && linkUrl)) return ['', 0];

	let out = `<a target="_blank" href="${linkUrl}">${linkName}</a>`;
	return [out, __offset + 2];
}
