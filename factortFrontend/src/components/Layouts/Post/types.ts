import type { E_VoteControllerActions } from '../../../components/Modules/VoteController/types';
import type { Complex_Data_Type, Props_DB_Model, Props_User } from '../../../types';

export type PostTypes = 'text' | 'images' | 'video' | 'audio' | 'link';

interface _Props_Post<CommentType> extends Props_DB_Model {
	user: Props_User;
	content: Post_Content_Complex_Type;
	community: Post_Community_Complex_Type;
	visibility: 'public' | 'unlisted' | 'private';

	comments: CommentType;

	title: string;
	prestige: number;

	c_vote_action: E_VoteControllerActions; // 0 = Not voted, 1 = Upvote, 2 = Downvote
}

export interface Props_PostComment extends Props_DB_Model {
	post: number; // id
	prestige: number;

	user: Props_User;
	replies: Props_PostCommentReply[];
	c_vote_action: E_VoteControllerActions;

	text: string;
}

export interface Props_PostCommentReply extends Props_DB_Model {
	comment: Props_PostComment;
	replying_to: Props_User | null;

	user: Props_User;

	prestige: number;
	text: string;

	c_vote_action: E_VoteControllerActions;
}

export interface Props_PreviewPost extends _Props_Post<number> {}
export interface Props_Post extends _Props_Post<Props_PostComment[]> {}

interface Post_Content_Video_Data {
	is_third_party: boolean;
	url: string;
}

// Content types
type Post_Content_Text = Complex_Data_Type<'text', string>;
type Post_Content_Images = Complex_Data_Type<'images', string[]>;
type Post_Content_Video = Complex_Data_Type<'video', string>;
type Post_Content_Audio = Complex_Data_Type<'audio', string>;
type Post_Content_Link = Complex_Data_Type<'link', string>;

type Post_Content_Complex_Type =
	| Post_Content_Text
	| Post_Content_Images
	| Post_Content_Video
	| Post_Content_Audio
	| Post_Content_Link;
// ==================

// Community types
type Post_From_Community = Complex_Data_Type<'community', object>; // Posted in a community
type Post_From_User = Complex_Data_Type<'user', null>; // Posted outside of a community

type Post_Community_Complex_Type = Post_From_Community | Post_From_User;
// ==================
