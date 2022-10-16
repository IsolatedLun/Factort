import type { KeyValue } from '../../../types';

export interface Props_FormContext {
	updateForms: (form: Props_Form) => void;
	currFormIndex: () => number;
}

export type FormTypes = 'counter' | string[];

export interface Props_Form {
	name: string;
	percentComplete: number;
	validatedInputs: KeyValue<boolean>;
}
