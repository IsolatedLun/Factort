import type { Props_Form } from '../../components/Modules/Form/types';
import type { Unsubscriber, Subscriber } from 'svelte/store';
import type { KeyValue } from '../../types';

export type Store_FormTypes = 'counter' | 'select';

export interface Store_FormHookVars {
	// Variables
	forms: HTMLFormElement[];
	formMode: Store_FormTypes;
	selected: string;

	isFormValid: boolean;
	completionPct: number;
	currentIndex: number;
}

export interface Store_FormHook {
	subscribe: (
		this: void,
		run: Subscriber<Store_FormHookVars>,
		/* @ts-ignore */
		invalidate?: Invalidator<Store_FormHookVars> | undefined
	) => Unsubscriber;

	instantiateForm: (form: HTMLFormElement) => void;
	validateForm: (form: HTMLFormElement) => void;

	decrementIndex: () => void;
	incrementIndex: () => void;
	changeIndex: (n: number) => void;
}
