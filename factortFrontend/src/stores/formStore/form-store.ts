import { objLen } from '../../utils/misc';
import { writable } from 'svelte/store';
import type { Store_Form, Store_FormContainer, Store_FormHook, Store_FormTypes } from './types';
import { bundleInputs } from '../../utils/form4Svelte/utils';

// The form container keeps tracks of the forms contained within it and the data dispatched from the forms,
// and controls which form is visible

// Each form keeps track of it's completion progress and if it's completed (bool)

/**
 * @param formType - Counter | Select
 *
 * @type Counter:
 * @summary The default multi-form option
 * @type Select:
 * @summary This option gives the user to select a single form out of many other forms
 */
export function useForm<T>(formType: Store_FormTypes = 'counter'): Store_FormHook<T> {
	const { subscribe, update, set } = writable<Store_FormContainer<T>>({
		forms: {},
		data: {} as T,
		selected: null,
		formType,

		currFormIndex: 0,
		totalCompletionPct: 0,

		isTotallyCompleted: false
	});

	return {
		subscribe,

		instantiateForm: (formTitle: string) => {
			update((state) => ({
				...state,
				forms: {
					...state.forms,
					[formTitle]: {
						name: formTitle,
						elements: bundleInputs(formTitle),
						completionPct: 0,
						isFormComplete: false
					}
				}
			}));
		},

		updateData: (value: any, name: string) => {
			update((state) => ({
				...state,
				data: { ...state.data, [name]: value }
			}));
		},

		// This gets called everytime an input is interacted with
		// The total completed and progress is updated along with the form's
		updateForm: (e: CustomEvent<HTMLInputElement>, formTitle: string) => {
			// =====================================
			// FormType specific validators
			function validateForm__Counter(form: Store_Form): [boolean, number] {
				const keys = Object.keys(form.elements);
				let isFormComplete = true;
				let completionPct = 0;

				for (let i = 0; i < keys.length; i++) {
					const el = form.elements[keys[i]];

					if (!el) {
						isFormComplete = false;
						break;
					}
				}

				completionPct = Object.values(form.elements).filter((x) => x === true).length / keys.length;
				return [isFormComplete, completionPct];
			}

			function validateForm__Select(form: Store_Form): [boolean, number] {
				const keys = Object.keys(form.elements);
				let isFormComplete = true;
				let completionPct = 0;

				for (let i = 0; i < keys.length; i++) {
					const el = form.elements[keys[i]];

					if (!el) {
						isFormComplete = false;
						break;
					}
				}

				completionPct = Object.values(form.elements).filter((x) => x === true).length / keys.length;
				return [isFormComplete, completionPct];
			}
			// ===================

			function updateFormContainer__Counter(state: Store_FormContainer<any>): [boolean, number] {
				const isTotallyCompleted = Object.values(state.forms).every((x) => x.isFormComplete);

				let totalCompletionPct = 0;
				Object.values(state.forms).forEach((form) => (totalCompletionPct += form.completionPct));

				return [isTotallyCompleted, totalCompletionPct];
			}

			function updateFormContainer__Select(
				state: Store_FormContainer<any>,
				formTitle: string
			): [boolean, number] {
				const isTotallyCompleted = state.forms[formTitle].isFormComplete;
				return [isTotallyCompleted, 0];
			}

			function updateInput(inputId: string): boolean {
				return document.getElementById(inputId)!.getAttribute('data-input-valid') === 'true';
			}

			update((state) => {
				const inputId = e.detail.id;
				const _state = state;
				const currForm = _state.forms[formTitle];

				currForm.elements[inputId] = updateInput(inputId);
				if (state.formType === 'counter') {
					const [isFormComplete, completionPct] = validateForm__Counter(currForm);
					currForm.completionPct = completionPct;
					currForm.isFormComplete = isFormComplete;

					const [isTotallyCompleted, totalCompletionPct] = updateFormContainer__Counter(_state);
					_state.isTotallyCompleted = isTotallyCompleted;
					_state.totalCompletionPct = totalCompletionPct;
				} else if (state.formType === 'select') {
					const [isFormComplete, completionPct] = validateForm__Select(currForm);
					currForm.completionPct = completionPct;
					currForm.isFormComplete = isFormComplete;

					const [isTotallyCompleted, totalCompletionPct] = updateFormContainer__Select(
						_state,
						formTitle
					);
					_state.isTotallyCompleted = isTotallyCompleted;
					_state.totalCompletionPct = totalCompletionPct;
				}

				console.log(currForm);
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
		changeIndex: (n: number, selected: string | null = null) => {
			update((state) => {
				if (n >= 0 && n < objLen(state.forms)) {
					state.currFormIndex = n;

					if (state.formType === 'select') {
						state.data = { selected } as T;

						if (selected) state.isTotallyCompleted = state.forms[selected].isFormComplete;
					}
				}

				return state;
			});
		}
	};
}
