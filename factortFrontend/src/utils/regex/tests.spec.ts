import { it, expect } from 'vitest';
import { URL_REGEX, youtubeLinkRegex } from './all';

it('Tests invalid/valid youtube links', () => {
	// Links must be like this:
	// 1) https://www.youtube.com/...
	// 2) https://youtu.be/...

	let goodLink_1 = 'https://youtu.be/ZSaAHb5dRwQ';
	let goodLink_2 = 'https://www.youtube.com/watch?v=ZSaAHb5dRwQ&t=188s';
	let goodLink_3 = 'https://youtu.be/ZSaAHb5dRwQ&t=188s';

	let badLink_1 = 'https://www.youtu.be/uuid=123';
	let badLink_2 = 'https://www.youtube.net/watch?v=123';
	let badLink_3 = 'https://youtube.com/watch?v=123';
	let badLink_4 = 'https://www.youtu.be/ZSaAHb5dRwQ&t=188s';

	expect(youtubeLinkRegex.test(goodLink_1)).toBeTruthy();
	expect(youtubeLinkRegex.test(goodLink_2)).toBeTruthy();
	expect(youtubeLinkRegex.test(goodLink_3)).toBeTruthy();

	expect(youtubeLinkRegex.test(badLink_1)).toBeFalsy();
	expect(youtubeLinkRegex.test(badLink_2)).toBeFalsy();
	expect(youtubeLinkRegex.test(badLink_3)).toBeFalsy();
	expect(youtubeLinkRegex.test(badLink_4)).toBeFalsy();
});

it('Tests invalid/valid urls', () => {
	// Links must be like this:
	// 1) https://www.youtube.com/...
	// 2) https://youtu.be/...

	let goodLink_1 = 'https://google.com';
	let goodLink_2 = 'https://www.google.com';
	let goodLink_3 = 'https://regexr.com';

	let badLink_1 = 'http://bad';
	let badLink_2 = 'htttps://google.com';
	let badLink_3 = 'https:/youtube.com/someordinarygamers';
	let badLink_4 = 'https:://www.youtube.com';

	expect(URL_REGEX.test(goodLink_1)).toBeTruthy();
	expect(URL_REGEX.test(goodLink_2)).toBeTruthy();
	expect(URL_REGEX.test(goodLink_3)).toBeTruthy();

	expect(URL_REGEX.test(badLink_1)).toBeFalsy();
	expect(URL_REGEX.test(badLink_2)).toBeFalsy();
	expect(URL_REGEX.test(badLink_3)).toBeFalsy();
	expect(URL_REGEX.test(badLink_4)).toBeFalsy();
});
