import type { Props_PreCheckedData_Complex } from 'src/utils/form4Svelte/types';
import type { Form_CreatePost } from './types';

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
