import type { PostVoteTypes, Props_PreviewPost } from '../../components/Layouts/Post/types';
import { POSTS_URL, POST_URL, VOTE_POST_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';
import type { Data_Vote_Post } from './types';

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
	return await createResponse<any, Props_PreviewPost>(
		POST_URL(id),
		{},
		HTTP_METHODS.GET,
		createHeaders({}, ['auth'])
	);
}

export async function _Vote_Post(id: number, data: Data_Vote_Post) {
	return await createResponse<any, number>(
		VOTE_POST_URL(id),
		data,
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}
