import type { Props_InputValidators } from '../../components/Modules/Interactibles/Inputs/types';

export function minLenValidator(n: number): Props_InputValidators {
	return {
		validate: (e: HTMLInputElement) => e.value.length > n - 1,
		errorText: `Must have atleast ${n} character(s).`
	};
}
