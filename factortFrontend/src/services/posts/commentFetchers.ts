import type {
	Props_PostComment,
	Props_PostCommentReply
} from '../../components/Layouts/Post/types';
import { POST_COMMENT_URL, REPLY_POST_COMMENT_URL, VOTE_POST_COMMENT_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';
import type { Data_ReplyOnComment, Data_VoteAction } from './types';

export async function _Comment_Post(id: number | string, text: string) {
	return await createResponse<any, Props_PostComment>(
		POST_COMMENT_URL(id),
		{ text },
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function _Vote_PostComment(data: any & Data_VoteAction) {
	console.log(data);
	return await createResponse<any, number>(
		VOTE_POST_COMMENT_URL(data['postId'], data['commentId']),
		data,
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function _Reply_On_Comment_Post(
	id: number | string,
	commentId: number | string,
	data: Data_ReplyOnComment
) {
	return await createResponse<any, Props_PostCommentReply>(
		REPLY_POST_COMMENT_URL(id, commentId),
		data,
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}
