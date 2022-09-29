import type { Props_Form } from 'src/components/Modules/Form/types';
import type { KeyValue } from '../../types';

export interface Store_Form {
	forms: KeyValue<Props_Form>;
	currFormIndex: number;
}
