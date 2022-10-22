import { objLen } from '../../utils/misc';
import { writable } from 'svelte/store';
import type { Store_FormHook, Store_FormHookVars, Store_FormTypes } from './types';

/**
 * @param data
 * @param formMode
 * @summary This hook controls whether or not if the form is valid and updates the data
 */
export function useForm<T>(data: T, formMode: Store_FormTypes): Store_FormHook {
	const { subscribe, set, update } = writable<Store_FormHookVars>({
		forms: [],
		formMode,
		selected: '',

		isFormValid: false,
		completionPct: 0,
		currentIndex: 0
	});

	return {
		subscribe,

		instantiateForm: (form) => {
			update((state) => {
				state.forms = [...state.forms, form];
				return state;
			});
		},

		validateForm: (form: HTMLFormElement) => {
			// If the formMode is 'counter', we loop through all the forms and sum up the completion %
			// and if the completion % is equal to the forms length, then the entire form is valid
			function _validateForms(forms: HTMLFormElement[]): [boolean, number] {
				let completionPct = 0;
				let isFormValid = false;

				forms.forEach((form) => {
					const inputs = form.querySelectorAll('input');
					const completedInputs = Object.values(inputs).filter(
						(x) => x.getAttribute('data-input-valid') === 'true'
					);

					completionPct += completedInputs.length / inputs.length;
				});

				if (completionPct === forms.length) isFormValid = true;

				return [isFormValid, completionPct];
			}

			update((state) => {
				let isFormValid = false;
				let completionPct = 0;

				if (state.formMode === 'counter')
					[isFormValid, completionPct] = _validateForms(state.forms);
				if (state.formMode === 'select')
					[isFormValid, completionPct] = _validateForms([state.forms[state.currentIndex]]);

				state.isFormValid = isFormValid;
				state.completionPct = completionPct;

				return state;
			});
		},

		// ===============================
		// Index alterning functions
		decrementIndex: () => {
			update((state) => {
				if (state.currentIndex !== 0) state.currentIndex--;
				else state.currentIndex - objLen(state.forms);
				return state;
			});
		},
		incrementIndex: () => {
			update((state) => {
				if (state.currentIndex < objLen(state.forms) - 1) state.currentIndex++;
				else state.currentIndex = 0;
				return state;
			});
		},
		changeIndex: (n: number) => {
			update((state) => {
				if (state.formMode === 'select') state.selected = state.forms[n].name;

				if (n >= 0 && n < objLen(state.forms)) state.currentIndex = n;
				return state;
			});
		}
	};
}
