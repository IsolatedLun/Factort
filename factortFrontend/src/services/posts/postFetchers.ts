import type { Numeric } from '../../types';
import type { Props_Post, Props_PreviewPost } from '../../components/Layouts/Post/types';
import {
	COMMUNITIES_POSTS_URL,
	POSTS_URL,
	POST_URL,
	USER_POSTS_URL,
	VOTE_POST_URL
} from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';
import type { Data_VoteAction, PaginatedResponse } from './types';

/**
 * @summary Fetches the feed for the user/anonymous
 */
export async function _Fetch_Posts(data: { id: Numeric; page: number }) {
	return await createResponse<any, PaginatedResponse<Props_PreviewPost>>(
		POSTS_URL,
		{ page: data['page'] },
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function _Fetch_User_Posts(data: { id: Numeric; page: number }) {
	return await createResponse<any, PaginatedResponse<Props_PreviewPost>>(
		USER_POSTS_URL(data['id']),
		{ page: data['page'] },
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function _Fetch_Community_Posts(data: { id: Numeric; page: number }) {
	return await createResponse<any, PaginatedResponse<Props_PreviewPost>>(
		COMMUNITIES_POSTS_URL(data['id']),
		{ page: data['page'] },
		HTTP_METHODS.POST,
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
