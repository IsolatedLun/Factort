import type { Props_Form } from 'src/components/Modules/Form/types';
import type { Unsubscriber, Subscriber } from 'svelte/store';
import type { KeyValue } from '../../types';

export interface Store_Form {
	forms: KeyValue<Props_Form>;

	currFormIndex: number;
	completionPct: number;

	isFormComplete: boolean;
}

export interface Store_FormHook {
	subscribe: (
		this: void,
		run: Subscriber<Store_Form>,
		invalidate?: Invalidator<Store_Form> | undefined
	) => Unsubscriber;

	updateForm: (formTitle: string, data: Props_Form) => void;
	updateFormInput: (e: CustomEvent<HTMLInputElement>, formTitle: string) => void;

	decrementIndex: () => void;
	incrementIndex: () => void;
	changeIndex: (n: number) => void;
}
