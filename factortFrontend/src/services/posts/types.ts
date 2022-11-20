import type { Props_PostComment, Props_PostCommentReply } from 'src/components/Layouts/Post/types';
import type { E_VoteControllerActions } from '../../components/Modules/VoteController/types';

export interface Data_VoteAction {
	action: E_VoteControllerActions;
	votes: number;
}

export interface Data_ReplyOnComment {
	text: string;
	replying_to: number | null;
}
