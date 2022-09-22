import { CREATE_YOUTUBE_IFRAME } from '../consts';
import { youtubeLinkRegex } from './regex/youtubeRegex';

export function createIframeElement(url: string): string {
	let uuid = (url.match(youtubeLinkRegex) as [string, string, string])[2];
	if (uuid.startsWith('watch?v=')) uuid = uuid.replace('watch?v=', '');

	const link = 'https://www.youtube.com/embed/' + uuid;
	return CREATE_YOUTUBE_IFRAME(link);
}
