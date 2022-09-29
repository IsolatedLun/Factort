export type InputTypes = 'text' | 'email' | 'password';

export interface Props_InputValidators {
	validate: (e: HTMLInputElement) => boolean;
	errorText: string;
}
