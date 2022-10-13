import axios from 'axios';
import type { KeyValue } from '../types';
import type { ErrorResponse, HTTP_METHODS, Success_OR_Error__Response } from './types';

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

type x = 'files' | 'auth';
export function createHeaders(headers: KeyValue<string> | null, _includes: x[]) {
	let _headers: KeyValue<string> = {};
	if (headers) _headers = headers;

	_includes.forEach((_type) => {
		if (_type === 'files') _headers['content-type'] = 'multipart/form-data';
	});

	return _headers;
}
