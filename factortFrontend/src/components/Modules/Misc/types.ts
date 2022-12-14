import type { Props_CommunityPreview } from '../../../components/Layouts/Community/types';
import type { Complex_Data_Type, Props_User } from '../../../types';

// Dyanamic label types
type DynamicLabel_User = Complex_Data_Type<'user', Props_User>;
type DynamicLabel_Community = Complex_Data_Type<'community', Props_CommunityPreview>;

export type Props_DynamicLabel_Complex_Type = DynamicLabel_User | DynamicLabel_Community;
export type DynamicLabelVariants = 'default' | 'view';
// ==================
