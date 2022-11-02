import type { Props_PreCheckedData_Complex } from '../utils/form4Svelte/types';
import type { Form_CreatePost } from '../routes/create/types';
import type { Form_Login, Form_Signup } from 'src/routes/auth/types';
import { EMAIL_REGEX } from './form4Svelte/consts';

// We always pre check the data before getting sent to the backend since a malicious user
// can trick
export function preCheck__Post(data: Form_CreatePost): Props_PreCheckedData_Complex {
	let err = '';

	if (data.title.length < 0) err = 'Title must not be empty';

	if (data.selected === 'images' && data.images.length === 0) err = 'There must be atleast 1 image';
	if (data.selected === 'video' && data.video === null) err = 'Title must not be empty';
	if (data.selected === 'link' && data.link.length === 0) err = 'Link must be valid';
	if (data.selected === 'text' && data.content.length === 0) err = 'Content must not be empty';

	if (err) return { type: 'error', data: err };
	return { type: 'success', data: null };
}

export function preCheck__SignUp(data: Form_Signup): Props_PreCheckedData_Complex {
	let err = '';

	if (data.email_address.length < 5 && EMAIL_REGEX.test(data.email_address))
		err = 'Invalid email address';
	if (data.password.length < 7) err = 'Invalid password';
	if (data.username.length < 2) err = 'Username must contain atleast 2 characters';
	if (data.profile === null) err = 'Profile must be an image';

	if (err) return { type: 'error', data: err };
	return { type: 'success', data: null };
}

export function preCheck__Login(data: Form_Login): Props_PreCheckedData_Complex {
	let err = '';

	if (data.email_address.length < 5 && EMAIL_REGEX.test(data.email_address))
		err = 'Invalid email address';
	if (data.password.length < 7) err = 'Invalid password';

	if (err) return { type: 'error', data: err };
	return { type: 'success', data: null };
}
