import type { Props_PreviewPost } from '../../components/Layouts/Post/types';
import { POSTS_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createResponse } from '../utils';

/**
 * @summary Fetches the feed for the user/anonymous
 */
export async function _Fetch_Posts() {
	return await createResponse<any, Props_PreviewPost[]>(POSTS_URL, {}, HTTP_METHODS.GET, {});
}
