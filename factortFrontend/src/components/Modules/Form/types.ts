export interface Props_FormContext {
	updateForms: (form: Props_Form) => void;
	currFormIndex: () => number;
}

export interface Props_Form {
	name: string;
	percentComplete: number;
}
