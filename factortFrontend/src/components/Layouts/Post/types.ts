import type { E_VoteControllerActions } from '../../../components/Modules/VoteController/types';
import type { Complex_Data_Type, Props_DB_Model, Props_User } from '../../../types';
import type { Props_CommunityPreview } from '../Community/types';

export type PostTypes = 'text' | 'images' | 'video' | 'audio' | 'link';
export enum E_PostVisibilityTypes {
	PUBLIC = 1,
	UNLISTED,
	PRIVATE
}

interface _Props_Post extends Props_DB_Model {
	user: Props_User;
	content: Post_Content_Complex_Type;
	community: Post_Community_Complex_Type;
	visibility: E_PostVisibilityTypes;

	title: string;
	prestige: number;

	comment_count: number;
	comments: Props_PostComment[];

	is_edited: boolean;

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

export type Props_PreviewPost = _Props_Post & Omit<_Props_Post, 'comments'>;
export type Props_Post = _Props_Post;

export type Props_BasePreviewPost = Pick<Props_PreviewPost, 'id' | 'title'>;

export interface Post_Content_Link_Data {
	url: string;
	site_name?: string;
	image?: string;
	description?: string;
}

// Content types
type Post_Content_Text = Complex_Data_Type<'text', string>;
type Post_Content_Images = Complex_Data_Type<'images', string[]>;
type Post_Content_Video = Complex_Data_Type<'video', string>;
type Post_Content_Audio = Complex_Data_Type<'audio', string>;
type Post_Content_Link = Complex_Data_Type<'link', Post_Content_Link_Data>;

type Post_Content_Complex_Type =
	| Post_Content_Text
	| Post_Content_Images
	| Post_Content_Video
	| Post_Content_Audio
	| Post_Content_Link;
// ==================

// Community types
type Post_From_Community = Complex_Data_Type<'community', Props_CommunityPreview>; // Posted in a community
type Post_From_User = Complex_Data_Type<'user', null>; // Posted outside of a community

type Post_Community_Complex_Type = Post_From_Community | Post_From_User;
// ==================
