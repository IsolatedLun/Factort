import type { Props_User } from 'src/types';
import type { Props_PreviewPost } from '../Post/types';

export interface Props_UserView extends Props_User {
	posts: Props_PreviewPost[];

	followers: number;

	is_following: boolean;
}
