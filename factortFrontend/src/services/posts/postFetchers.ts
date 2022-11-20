import type { Props_Post, Props_PreviewPost } from '../../components/Layouts/Post/types';
import { POSTS_URL, POST_URL, VOTE_POST_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';
import type { Data_VoteAction } from './types';

/**
 * @summary Fetches the feed for the user/anonymous
 */
export async function _Fetch_Posts() {
	return await createResponse<any, Props_PreviewPost[]>(
		POSTS_URL,
		{},
		HTTP_METHODS.GET,
		createHeaders({}, ['auth'])
	);
}

export async function _Fetch_Post(id: number) {
	return await createResponse<any, Props_Post>(
		POST_URL(id),
		{},
		HTTP_METHODS.GET,
		createHeaders({}, ['auth'])
	);
}

export async function _Vote_Post(data: any & Data_VoteAction) {
	return await createResponse<any, number>(
		VOTE_POST_URL(data['postId']),
		data,
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}
