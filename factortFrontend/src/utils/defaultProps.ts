import type { Form_CreateCommunity, Form_CreatePost } from 'src/routes/create/types';
import {
	E_PostVisibilityTypes,
	type Props_Post,
	type Props_PreviewPost
} from '../components/Layouts/Post/types';
import type { Props_User } from '../types';
import type { MKD_ParsedData } from './markdown/types';

export function createDefaultPost<A, B>(content: A, comments: B | number = 0) {
	return {
		id: 0,
		user: createDefaultUser(),
		title: 'A default title',
		prestige: 0,
		content,
		comments,
		community: { type: 'user', data: null },
		visibility: E_PostVisibilityTypes.PUBLIC,
		date_created: '',

		c_vote_action: 0
	} as Props_PreviewPost;
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
		email_address: '',
		username: '',
		password: '',
		profile: null
	};
}

export function createDefaultLoginData() {
	return {
		email_address: '',
		password: ''
	};
}

export function createDefaultCreatePostData(): Form_CreatePost {
	return {
		title: '',
		selected: '',
		visibility: E_PostVisibilityTypes.PUBLIC,

		content: '',
		images: [],
		video: null,
		audio: null,
		link: '',

		community_id: -1
	};
}

export function createDefaultCreateCommunityData(): Form_CreateCommunity {
	return {
		name: '',
		about: '',

		profile: null,
		banner: null
	};
}
