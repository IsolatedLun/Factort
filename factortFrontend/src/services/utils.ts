import axios from 'axios';
import { getTokens } from '../utils/tokenHandler';
import type { KeyValue } from '../types';
import type { ErrorResponse, HeaderTypes, HTTP_METHODS, Success_OR_Error__Response } from './types';

/**
 * @param url
 * @param data
 * @param method
 * @param headers
 * @summary Creates a HTTP response depending on the parameters inputted
 */
export async function createResponse<DataT, ReturnT>(
	url: string,
	data: DataT,
	method: HTTP_METHODS,
	headers: KeyValue<string>
): Promise<Success_OR_Error__Response<ReturnT>> {
	let out = { type: 'error', data: '' };
	// We use this to reduce code by not writing axios.get(), axios.post(), ...
	await axios
		.request({
			url,
			method,
			data,
			headers
		})
		.then((_data) => {
			out['data'] = _data.data;
			out['type'] = 'success';
		})
		.catch((err: ErrorResponse) => {
			out['data'] = err.response.data;
			out['type'] = 'error';
		});

	return out as Success_OR_Error__Response<ReturnT>;
}

/**
 * @param headers
 * @param _includes
 * @summary Creates a HTTP header
 */
export function createHeaders(headers: KeyValue<string> | null, extra: HeaderTypes[]) {
	let _headers: KeyValue<string> = {};
	if (headers) _headers = headers;

	extra.forEach((_type) => {
		// This type is not recommended since it's bugged out (for forms that have text and file data)
		// use 'files+json' instead
		if (_type === 'files') _headers['Content-Type'] = 'multipart/form-data';

		// This type only works for fors that have text data
		if (_type === 'json') _headers['Content-Type'] = 'application/json';
		if (_type === 'files+json') _headers['Content-Type'] = 'application/json; multipart/form-data';

		if (_type === 'auth') {
			const tokens = getTokens();

			if (tokens.access) _headers['Authorization'] = 'Bearer ' + tokens.access;
		}
	});

	return _headers;
}
