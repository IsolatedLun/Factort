import { createDefaultUser } from '../utils/defaultProps';
import { writable } from 'svelte/store';
import type { Store_Global } from './types';

export const globalStore = writable<Store_Global>({
	userStore: {
		user: createDefaultUser(),
		isLogged: false
	},

	visitedStore: {
		visitedPosts: [],
		idx: 0
	},

	currentCommunity: null
});
