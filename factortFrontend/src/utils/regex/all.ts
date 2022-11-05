export const youtubeLinkRegex =
	/https:\/\/(www.youtube.com|youtu.be)\/(watch\?v=[a-z0-9A-Z]+|[a-z0-9A-Z]+)/;

export const URL_REGEX = /(https|http)+:\/\/(S+\.)?[\S]+\.[\S]+/g;

// Functions
export function isValidYoutubeLink(url: string) {
	return youtubeLinkRegex.test(url);
}

export function isValidUrl(url: string) {
	return youtubeLinkRegex.test(url);
}
