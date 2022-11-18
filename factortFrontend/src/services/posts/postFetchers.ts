import type {
	PostVoteTypes,
	Props_Post,
	Props_PostComment,
	Props_PostCommentReply,
	Props_PreviewPost
} from '../../components/Layouts/Post/types';
import {
	POSTS_URL,
	POST_COMMENT_URL,
	POST_URL,
	REPLY_POST_COMMENT_URL,
	VOTE_POST_URL
} from '../../consts';
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
	return await createResponse<any, Props_Post>(
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

export async function _Comment_Post(id: number | string, text: string) {
	return await createResponse<any, Props_PostComment>(
		POST_COMMENT_URL(id),
		{ text },
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function _Reply_On_Comment_Post(
	id: number | string,
	commentId: number | string,
	text: string
) {
	return await createResponse<any, Props_PostCommentReply>(
		REPLY_POST_COMMENT_URL(id, commentId),
		{ text },
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}
