import type { Props_UserView } from 'src/components/Layouts/User/types';
import { USER_LATEST_FOLLOWERS_URL, USER_TOGGLE_FOLLOW_URL, USER_URL } from '../../consts';
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

export async function _Toggle_UserFollower(id: number) {
	return await createResponse<{}, null>(
		USER_TOGGLE_FOLLOW_URL(id),
		{},
		HTTP_METHODS.POST,
		createHeaders({}, ['auth'])
	);
}

export async function _User_Latest_Followers(id: number) {
	return await createResponse<{}, null>(
		USER_LATEST_FOLLOWERS_URL(id),
		{},
		HTTP_METHODS.GET,
		createHeaders({}, ['auth'])
	);
}
