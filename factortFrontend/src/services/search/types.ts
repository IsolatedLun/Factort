import type { Props_CommunityPreview } from '../../components/Layouts/Community/types';
import type { Props_User } from '../../types';

export interface Data_SearchResults {
	users: Props_User[];
	communities: Props_CommunityPreview[];
}
