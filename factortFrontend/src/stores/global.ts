import { createDefaultUser } from '../utils/defaultProps';
import { writable } from 'svelte/store';
import type { Store_Global } from './types';

export const globalStore = writable<Store_Global>({
	user: createDefaultUser(),
	isLogged: false
});
