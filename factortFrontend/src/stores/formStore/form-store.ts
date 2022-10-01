import type { Props_Form } from '../../components/Modules/Form/types';
import { objLen } from '../../utils/misc';
import { writable } from 'svelte/store';
import type { Store_Form } from './types';
import type { KeyValue } from '../../types';

export function useForm() {
	const { subscribe, update, set } = writable<Store_Form>({
		forms: {},

		currFormIndex: 0,
		completionPct: 0,

		isFormComplete: false
	});

	return {
		subscribe,

		// This can be used to update or add an form entirely
		updateForm: (formTitle: string, data: Props_Form) => {
			update((state) => ({
				...state,
				forms: {
					...state.forms,
					[formTitle]: {
						...data
					}
				}
			}));
		},

		// Sets whether or not the current change on the input is valid
		// Then updates the form completion percentage
		// Then updates the total completion percentages
		// And sets whether or not if the form is complete
		updateFormInput: (e: CustomEvent<HTMLInputElement>, formTitle: string) => {
			function calculateFormCompletionPct(form: Props_Form) {
				const completedAmt = Object.values(form.validatedInputs).filter((x) => x === true).length;
				return completedAmt / objLen(form.validatedInputs);
			}

			function calculateTotalCompletionPct(forms: KeyValue<Props_Form>) {
				let sum = 0;
				Object.values(forms).forEach((form) => (sum += form.percentComplete));

				return sum;
			}

			update((state) => {
				const inputId = e.detail.id;
				const _state = state;
				const currForm = _state.forms[formTitle];

				currForm.validatedInputs[inputId] =
					e.detail.getAttribute('data-input-valid')! === 'true' ? true : false;
				currForm.percentComplete = calculateFormCompletionPct(currForm);

				_state.completionPct = calculateTotalCompletionPct(_state.forms);
				_state.isFormComplete = _state.completionPct === objLen(_state.forms);
				return _state;
			});
		},

		// Simple functions
		decrementIndex: () => {
			update((state) => {
				if (state.currFormIndex !== 0) state.currFormIndex--;
				else state.currFormIndex - objLen(state.forms);
				return state;
			});
		},
		incrementIndex: () => {
			update((state) => {
				if (state.currFormIndex < objLen(state.forms) - 1) state.currFormIndex++;
				else state.currFormIndex = 0;
				return state;
			});
		},
		changeIndex: (n: number) => {
			update((state) => {
				if (n >= 0 && n < objLen(state.forms)) state.currFormIndex = n;
				return state;
			});
		}
	};
}
