export const youtubeLinkRegex =
	/https:\/\/(www.youtube.com|youtu.be)\/(watch\?v=[a-z0-9A-Z_]+|[a-z0-9A-Z_]+)/;

export const URL_REGEX = new RegExp('(http|https)://');
// asd

// Functions
export function isValidYoutubeLink(url: string) {
	return youtubeLinkRegex.test(url);
}

export function isValidUrl(url: string) {
	return URL_REGEX.test(url);
}
