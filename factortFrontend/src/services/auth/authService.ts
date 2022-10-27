import type { Form_Login, Form_Signup } from '../../routes/auth/types';
import { AUTHENTICATE_URL, LOGIN_URL, REGISTER_URL } from '../../consts';
import { HTTP_METHODS } from '../types';
import { createHeaders, createResponse } from '../utils';
import type { Response_LoginView } from './types';
import type { Props_User } from '../../types';

export async function _Register_View(data: Form_Signup) {
	return await createResponse<Form_Signup, number>(
		REGISTER_URL,
		data,
		HTTP_METHODS.POST,
		createHeaders(null, ['files'])
	);
}

export async function _Login_View(data: Form_Login) {
	return await createResponse<Form_Login, Response_LoginView>(
		LOGIN_URL,
		data,
		HTTP_METHODS.POST,
		createHeaders(null, ['json'])
	);
}

export async function _Authenticate_View() {
	return await createResponse<{}, Props_User>(
		AUTHENTICATE_URL,
		{},
		HTTP_METHODS.POST,
		createHeaders(null, ['auth'])
	);
}
