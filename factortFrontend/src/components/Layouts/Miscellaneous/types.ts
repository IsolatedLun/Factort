import type { Success_OR_Error__Response } from 'src/services/types';
import type { Complex_Data_Type, Props_User } from 'src/types';
import type { Props_CommunityPreview } from '../Community/types';

type Misc_CommunitySectionComplexType = Complex_Data_Type<'community', Props_CommunityPreview[]>;
type Misc_UsersSectionComplexType = Complex_Data_Type<'user', Props_User[]>;

type MiscellaneuosTypeComplexTypes =
	| Misc_CommunitySectionComplexType
	| Misc_UsersSectionComplexType;

export interface Props_MiscellaneousSection {
	title: string;
	id: number | null;

	fetchFn:
		| ((...args: any) => Promise<Success_OR_Error__Response<MiscellaneuosTypeComplexTypes>>)
		| null;
}
