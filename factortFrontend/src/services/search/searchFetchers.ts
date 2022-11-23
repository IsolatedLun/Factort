import { SEARCH_BAR_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';
import type { Data_SearchResults } from './types';

export async function _Search_Bar(query: string) {
	return await createResponse<any, Data_SearchResults>(
		SEARCH_BAR_URL,
		{ query },
		HTTP_METHODS.POST,
		{}
	);
}
