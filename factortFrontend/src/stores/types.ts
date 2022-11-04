import type { Props_User } from 'src/types';

export interface Store_Global {
	userStore: {
		user: Props_User;
		isLogged: boolean;
	};
}
