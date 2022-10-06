import type { KeyValue } from '../../types';

export const EMAIL_REGEX = /^\S+@\w+\.\w+/;

// File type dictionaries
export const FILE_TYPE_DICT: KeyValue<string[]> = {
	png: ['.png'],
	jpg: ['.jpg'],
	jpeg: ['.jpeg'],
	gif: ['.gif'],
	image: ['.png', '.jpg', '.jpeg', '.gif'],
	video: ['.mp4', '.mov', '.avi', '.mpg']
};
