import type {
	Props_Community,
	Props_CommunityPreview
} from '../../components/Layouts/Community/types';
import {
	COMMUNITIES_URL,
	COMMUNITY_MISC_ADMINS_URL,
	COMMUNITY_MISC_URL,
	COMMUNITY_URL
} from '../../consts';
import { HTTP_METHODS } from '../types';
import { createResponse } from '../utils';

/**
 * @summary Fetches the feed for the user/anonymous
 */
export async function _Fetch_Communities() {
	return await createResponse<any, Props_CommunityPreview[]>(
		COMMUNITIES_URL,
		{},
		HTTP_METHODS.GET,
		{}
	);
}

export async function _Fetch_Community(id: number) {
	return await createResponse<any, Props_Community>(COMMUNITY_URL(id), {}, HTTP_METHODS.GET, {});
}

export async function _Fetch_Misc_CommunityPreviews(id: number) {
	return await createResponse<any, Props_CommunityPreview[]>(
		COMMUNITY_MISC_URL,
		{ id },
		HTTP_METHODS.GET,
		{}
	);
}

export async function _Fetch_Misc_CommunityAdmins(id: number) {
	return await createResponse<any, Props_CommunityPreview[]>(
		COMMUNITY_MISC_ADMINS_URL(id),
		{},
		HTTP_METHODS.GET,
		{}
	);
}
