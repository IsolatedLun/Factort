import type {
	Props_Community,
	Props_CommunityPreview
} from '../../components/Layouts/Community/types';
import {
	COMMUNITIES_URL,
	COMMUNITY_MISC_ADMINS_URL,
	COMMUNITY_MISC_URL,
	COMMUNITY_TOGGLE_JOIN_URL,
	COMMUNITY_URL
} from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';

export async function _Fetch_Communities() {
	return await createResponse<any, Props_CommunityPreview[]>(
		COMMUNITIES_URL,
		{},
		HTTP_METHODS.GET,
		{}
	);
}

export async function _Fetch_Community(id: number) {
	return await createResponse<any, Props_Community>(
		COMMUNITY_URL(id),
		{},
		HTTP_METHODS.GET,
		createHeaders(null, ['auth'])
	);
}

export async function _Fetch_Misc_CommunityPreviews(id: number) {
	return await createResponse<any, Props_CommunityPreview[]>(
		COMMUNITY_MISC_URL,
		{ id },
		HTTP_METHODS.POST,
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

export async function _Toggle_Community_Join(id: number) {
	return await createResponse<any, null>(
		COMMUNITY_TOGGLE_JOIN_URL(id),
		{},
		HTTP_METHODS.POST,
		createHeaders(null, ['auth'])
	);
}
