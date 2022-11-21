import type {
	Props_PostComment,
	Props_PostCommentReply,
	Props_PreviewPost
} from 'src/components/Layouts/Post/types';
import type { E_VoteControllerActions } from '../../components/Modules/VoteController/types';
import type { Success_OR_Error__Response } from '../types';

export interface Data_VoteAction {
	action: E_VoteControllerActions;
	votes: number;
}

export interface Data_ReplyOnComment {
	text: string;
	replying_to: number | null;
}

export interface PaginatedResponse<T> {
	next_page: number | null;
	data: T[];
}
export type PostFetcherFn = (
	...args: any
) => Promise<Success_OR_Error__Response<PaginatedResponse<Props_PreviewPost>>>;
