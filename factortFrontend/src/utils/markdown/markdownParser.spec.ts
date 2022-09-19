import { it, expect } from 'vitest';
import { parseMarkdown } from './markdownParser';

it('Parses an user-inputted text into valid markdown', () => {
	let result = '';

	const headingTextWithNestedMarkdown = parseMarkdown('# Very * EPIC /* /#', []);
	result = '<h1>&nbsp;Very&nbsp;<i> EPIC </i>&nbsp;</h1>';

	expect(headingTextWithNestedMarkdown).toEqual(result);

	const ListWithTwoLinks = parseMarkdown(
		'- [google](https://www.google.com)\n - [youtube](https://www.youtube.com)',
		[]
	);
	result =
		'<ul><li><a target="_blank" href="https://www.google.com">google</a></li></ul>&nbsp;<ul><li><a target="_blank" href="https://www.youtube.com">youtube</a></li></ul>';

	expect(ListWithTwoLinks).toEqual(result);
});
