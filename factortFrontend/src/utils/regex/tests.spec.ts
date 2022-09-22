import { it, expect } from 'vitest';
import { youtubeLinkRegex } from './youtubeRegex';

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

	expect(youtubeLinkRegex.test(goodLink_1)).toBe(true);
	expect(youtubeLinkRegex.test(goodLink_2)).toBe(true);
	expect(youtubeLinkRegex.test(goodLink_3)).toBe(true);

	expect(youtubeLinkRegex.test(badLink_1)).toBe(false);
	expect(youtubeLinkRegex.test(badLink_2)).toBe(false);
	expect(youtubeLinkRegex.test(badLink_3)).toBe(false);
	expect(youtubeLinkRegex.test(badLink_4)).toBe(false);
});
