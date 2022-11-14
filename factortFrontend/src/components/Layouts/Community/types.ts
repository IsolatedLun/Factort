import type { Props_DB_Model, Props_User } from '../../../types';
import type { Props_PreviewPost } from '../Post/types';

export interface Props_CommunityPreview extends Props_DB_Model {
	name: string;
	profile: string;

	members: number;
}

export interface Props_Community extends Props_CommunityPreview {
	owner: Props_User;
	posts: Props_PreviewPost[];

	banner: string;

	c_has_joined_community: boolean;
}
