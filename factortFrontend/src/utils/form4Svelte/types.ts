export interface Props_InputValidator {
	validate: (e: HTMLInputElement) => boolean;
	errorText: string;
}

export interface Props_InputValidationResult {
	errors: string[];
	isValid: boolean;
}

export interface Props_CreatedInputValidator {
	validator: Props_InputValidator;
}
