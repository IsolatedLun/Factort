import type { Props_UserView } from 'src/components/Layouts/User/types';
import type { Props_PreviewPost } from '../../components/Layouts/Post/types';
import { POSTS_URL, POST_URL, USER_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';

/**
 * @summary Fetches the feed for the user/anonymous
 */
export async function _Fetch_User(id: number) {
	return await createResponse<{}, Props_UserView>(
		USER_URL(id),
		{},
		HTTP_METHODS.GET,
		createHeaders({}, ['auth'])
	);
}
