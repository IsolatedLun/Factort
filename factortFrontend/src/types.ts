export interface Props_DB_Model {
	id: number;
	date_created: string;
}

export interface Props_User extends Props_DB_Model {
	username: string;
	profile: string;
}

export type EventFunction<EventT> = (e: EventT) => void;

export interface KeyValue<T> {
	[key: string]: T;
}
