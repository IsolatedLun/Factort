import type { Numeric } from '../../types';
import type { E_VoteControllerActions } from '../../components/Modules/VoteController/types';
import type { Success_OR_Error__Response } from '../types';
import type { SortByTypes } from '../../components/Layouts/Paginator/types';

export interface Data_VoteAction {
	action: E_VoteControllerActions;
	votes: number;
}

export interface Data_UpdatePost {
	title: string;
}

export interface Data_ReplyOnComment {
	text: string;
	replying_to: number | null;
}

export interface Data_Pagination {
	id: Numeric;
	page: Numeric;
	sortBy: SortByTypes;
}

export type Data_PaginationWithoutID = Omit<Data_Pagination, 'id'>;

// =======================================
// =======================================

export interface PaginatedResponse<T> {
	next_page: number | null;
	data: T[];
}
export type PaginationFetcherFn<T> = (
	...args: any
) => Promise<Success_OR_Error__Response<PaginatedResponse<T>>>;
