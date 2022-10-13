import { REGISTER_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';

export async function _Register_View(data: any) {
	return await createResponse<any, any>(
		REGISTER_URL,
		data,
		HTTP_METHODS.POST,
		createHeaders(null, ['files'])
	);
}
