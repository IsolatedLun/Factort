import { writable } from 'svelte/store';
import type { Store_Layout } from './types';

export const layoutStore = writable<Store_Layout>({
	stickNavbarToSide: false
});
