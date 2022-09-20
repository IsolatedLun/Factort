import type { Props_Post } from 'src/components/Layouts/Post/types';
import type { Props_User } from 'src/types';

export function createDefaultPost<A, B, C>(
	content: A,
	comments: B | number = 0,
	replies: C | number = 0
) {
	return {
		id: 0,
		user: createDefaultUser(),
		title: 'A default title',
		votes: 0,
		content,
		comments,
		replies,
		community: { type: 'user', data: null },
		date_created: ''
	} as Props_Post<B, C>;
}

export function createDefaultUser() {
	return {
		id: 0,
		username: 'Default User',
		profile: '',
		prestige: 0,
		date_created: ''
	} as Props_User;
}
