export interface Props_DB_Model {
	id: number;
	date_created: string;
}

export interface Props_DB_Model_No_Date {
	id: number;
}

export interface Props_Tokens {
	refresh: string | null;
	access: string | null;
}

export interface Props_User extends Props_DB_Model {
	username: string;
	profile: string;

	prestige: number;

	show_liked_posts: boolean;
	show_joined_communities: boolean;
}

export type EventFunction<EventT> = (e: EventT) => void;

export interface KeyValue<T> {
	[key: string]: T;
}

export type TypedKeyValue<K extends string | number, V> = { [key in K]: V };

export type Complex_Data_Type<T, O> = { type: T; data: O };

export interface SyntheticTarget<T> {
	target: T;
}
