import { writable } from 'svelte/store';
import type { Store_Form } from './types';

export const formStore = writable<Store_Form>({
	forms: [],
	currFormIndex: 0
});
