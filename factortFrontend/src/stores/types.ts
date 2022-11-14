import type { Props_Community } from 'src/components/Layouts/Community/types';
import type { Props_User } from '../types';
import type { Props_VisitedPost } from '../utils/postHistory/types';

export interface Store_Global {
	userStore: {
		user: Props_User;
		isLogged: boolean;
	};

	visitedStore: {
		visitedPosts: Props_VisitedPost[];
		idx: number;
	};

	currentCommunity: Props_Community | null;
}
