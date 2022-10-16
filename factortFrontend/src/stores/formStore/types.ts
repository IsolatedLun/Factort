import type { Props_Form } from '../../components/Modules/Form/types';
import type { Unsubscriber, Subscriber } from 'svelte/store';
import type { KeyValue } from '../../types';

export type Store_FormTypes = 'counter' | 'select';

export interface Store_Form<T> {
	forms: KeyValue<Props_Form>;
	data: T;
	formType: Store_FormTypes;

	currFormIndex: number;
	completionPct: number;

	isFormComplete: boolean;
}

export interface Store_FormHook<T> {
	subscribe: (
		this: void,
		run: Subscriber<Store_Form<T>>,
		/* @ts-ignore */
		invalidate?: Invalidator<Store_Form> | undefined
	) => Unsubscriber;

	updateForm: (formTitle: string, data: Props_Form) => void;
	updateData: (value: any, name: string) => void;
	updateFormInput: (e: CustomEvent<HTMLInputElement>, formTitle: string) => void;

	decrementIndex: () => void;
	incrementIndex: () => void;
	changeIndex: (n: number) => void;
}
