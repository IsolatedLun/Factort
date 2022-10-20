import type { Props_Form } from '../../components/Modules/Form/types';
import type { Unsubscriber, Subscriber } from 'svelte/store';
import type { KeyValue } from '../../types';

export type Store_FormTypes = 'counter' | 'select';

export interface Store_FormContainer<T> {
	forms: KeyValue<Store_Form>;
	data: T;

	selected: Store_FormTypes | null;
	formType: Store_FormTypes;

	currFormIndex: number;
	totalCompletionPct: number;

	isTotallyCompleted: boolean;
}

export interface Store_Form {
	name: string;
	elements: KeyValue<boolean>;

	completionPct: number;
	isFormComplete: boolean;
}

export interface Store_FormHook<T> {
	subscribe: (
		this: void,
		run: Subscriber<Store_FormContainer<T>>,
		/* @ts-ignore */
		invalidate?: Invalidator<Store_Form> | undefined
	) => Unsubscriber;

	instantiateForm: (formTitle: string) => void;
	updateData: (value: any, name: string) => void;
	updateForm: (e: CustomEvent<HTMLInputElement>, formTitle: string) => void;

	decrementIndex: () => void;
	incrementIndex: () => void;
	changeIndex: (n: number, selected?: string) => void;
}
