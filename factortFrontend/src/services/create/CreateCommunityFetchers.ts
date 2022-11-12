import { CREATE_COMMUNITY_URL } from '../../consts';
import type { Form_CreateCommunity } from '../../routes/create/types';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';

/**
 * @summary Fetches the feed for the user/anonymous
 */
export async function _Create_Community(data: Form_CreateCommunity) {
	return await createResponse<Form_CreateCommunity, number>(
		CREATE_COMMUNITY_URL,
		data,
		HTTP_METHODS.POST,
		createHeaders(null, ['files+json', 'auth'])
	);
}
