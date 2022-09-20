import type { Props_DB_Model, Props_User } from 'src/types';

export interface Props_Post<CommentType, ReplyType> extends Props_DB_Model {
	user: Props_User;
	content: Post_Content_Complex_Type;
	community: Post_Community_Complex_Type;

	comments: CommentType;
	replies: ReplyType;

	title: string;
	votes: number;
}

type Post_Data_Type<T, O> = { type: T; data: O };

// Content types
type Post_Content_Text = Post_Data_Type<'text', string>;
type Post_Content_Images = Post_Data_Type<'images', string[]>;
type Post_Content_Video = Post_Data_Type<'video', string>;

type Post_Content_Complex_Type = Post_Content_Text | Post_Content_Images | Post_Content_Video;
// ==================

// Community types
type Post_From_Community = Post_Data_Type<'community', object>; // Posted in a community
type Post_From_User = Post_Data_Type<'user', null>; // Posted outside of a community

type Post_Community_Complex_Type = Post_From_Community | Post_From_User;
// ==================
