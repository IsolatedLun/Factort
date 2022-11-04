import { CREATE_POST_URL } from '../../consts';
import type { Form_CreatePost } from '../../routes/create/types';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';

/**
 * @summary Fetches the feed for the user/anonymous
 */
export async function _Create_Post(data: Form_CreatePost) {
	return await createResponse<Form_CreatePost, number>(
		CREATE_POST_URL,
		data,
		HTTP_METHODS.POST,
		createHeaders(null, ['files+json', 'auth'])
	);
}
