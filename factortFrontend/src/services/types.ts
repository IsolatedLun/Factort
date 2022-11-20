import type { Complex_Data_Type } from 'src/types';

export enum HTTP_METHODS {
	GET = 'GET',
	POST = 'POST',
	DELETE = 'DELETE'
}

export type HeaderTypes = 'files' | 'json' | 'files+json' | 'auth';

export interface Response<T> {
	data: T;
	status: number;
}

export interface ErrorResponse {
	status: number;
	response: {
		data: string | { detail: string };
	};
}

export type Success_OR_Error__Response<T> =
	| Complex_Data_Type<'error', string>
	| Complex_Data_Type<'success', T>;
