import type { Complex_Data_Type } from '../../types';

export interface Props_InputValidator<T> {
	validate: (e: HTMLInputElement | T) => boolean;
	errorText: string;
}

export interface Props_InputValidationResult {
	errors: string[];
	isValid: boolean;
}

export interface Props_CreatedInputValidator {
	validator: Props_InputValidator<never>;
}

export interface Props_FileSizeEquation {
	min?: number;
	max?: number;
}

type _PreCheckedData__Success = Complex_Data_Type<'success', null>;
type _PreCheckedData__Error = Complex_Data_Type<'error', string>;

export type Props_PreCheckedData_Complex = _PreCheckedData__Success | _PreCheckedData__Error;

export type PreCheckDataFn<T> = (data: T) => Props_PreCheckedData_Complex;
