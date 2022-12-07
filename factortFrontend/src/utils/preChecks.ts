import type { Props_PreCheckedData_Complex } from '../utils/form4Svelte/types';
import type { Form_CreateCommunity, Form_CreatePost } from '../routes/create/types';
import type { Form_Login, Form_Signup } from 'src/routes/auth/types';
import { EMAIL_REGEX } from './form4Svelte/consts';
import { fileTypeValidator } from './form4Svelte/validators';

// We always pre check the data before getting sent to the backend
// To avoid malicious data being accepted

export function preCheck__Post(data: Form_CreatePost): Props_PreCheckedData_Complex {
	let err = '';

	if (data.title.length < 0) err = 'Title must not be empty';

	if (data.selected === 'images') {
		if (data.images.length === 0) err = 'There must be atleast 1 image';
		// Since images is an [], we loop and validate until an error occurs
		else {
			for (let i = 0; i < data.images.length; i++) {
				if (err) break;

				const res = fileTypeValidator('image');
				if (!res.validate(data.images[i])) err = res.errorText;
			}
		}
	}

	if (data.selected === 'video') {
		if (!data.video) err = 'Video must not be empty';
		else {
			const res = fileTypeValidator('video');
			if (!res.validate(data.video)) err = res.errorText;
		}
	}
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

	if (!data.profile) err = 'Profile must not be empty';
	else {
		const res = fileTypeValidator('image');
		if (!res.validate(data.profile)) err = res.errorText;
	}

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

export function preCheck_Community(data: Form_CreateCommunity): Props_PreCheckedData_Complex {
	let err = '';

	if (data.name.length < 1) err = 'Name must not be empty';

	if (!data.profile) err = 'Profile must not be empty';
	else {
		const res = fileTypeValidator('image');
		if (!res.validate(data.profile)) err = res.errorText;
	}

	if (!data.banner) err = 'Banner must not be empty';
	else {
		const res = fileTypeValidator('image');
		if (!res.validate(data.banner)) err = res.errorText;
	}

	if (err) return { type: 'error', data: err };
	return { type: 'success', data: null };
}
