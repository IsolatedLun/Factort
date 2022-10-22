import type { Form_CreatePost } from 'src/routes/create/types';
import type { Props_Post } from '../components/Layouts/Post/types';
import type { Props_User } from '../types';
import type { MKD_ParsedData } from './markdown/types';

export function createDefaultPost<A, B, C>(
	content: A,
	comments: B | number = 0,
	replies: C | number = 0
) {
	return {
		id: 0,
		user: createDefaultUser(),
		title: 'A default title',
		votes: 0,
		content,
		comments,
		replies,
		community: { type: 'user', data: null },
		visibility: 'public',
		date_created: ''
	} as Props_Post;
}

export function createDefaultUser() {
	return {
		id: 0,
		username: 'Default User',
		profile:
			'https://yt3.ggpht.com/ytc/AMLnZu_rvCitwUFPXMuxQN7ovCZVHYReLWmUXstUSGd__g=s88-c-k-c0x00ffffff-no-rj',
		prestige: 0,
		date_created: ''
	} as Props_User;
}

export function createDefaultParsedData<T>(): MKD_ParsedData<T> {
	return { result: false as T, data: { count: 0, offset: 1 } };
}

export function createDefaultSignUpData() {
	return {
		email: '',
		username: '',
		password: '',
		profile: null
	};
}

export function createDefaultCreatePostData(): Form_CreatePost {
	return {
		title: '',

		content: '',
		images: [],
		video: null,
		link: ''
	};
}
