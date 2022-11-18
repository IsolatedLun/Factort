export enum E_VoteControllerActions {
	NEUTRAL,
	UPVOTE,
	DOWNVOTE
}

export interface Data_VoteFn {
	votes: number;
	action: E_VoteControllerActions;
}
