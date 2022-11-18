import { E_VoteControllerActions } from '../../components/Modules/VoteController/types';

export function upvote(
	votes: number,
	prevAction: E_VoteControllerActions
): [number, E_VoteControllerActions] {
	if (prevAction === E_VoteControllerActions.NEUTRAL)
		return [votes + 1, E_VoteControllerActions.UPVOTE];
	if (prevAction === E_VoteControllerActions.UPVOTE)
		return [votes - 1, E_VoteControllerActions.NEUTRAL];
	if (prevAction === E_VoteControllerActions.DOWNVOTE)
		return [votes + 2, E_VoteControllerActions.UPVOTE];

	return [0, E_VoteControllerActions.NEUTRAL];
}

export function downvote(
	votes: number,
	prevAction: E_VoteControllerActions
): [number, E_VoteControllerActions] {
	if (prevAction === E_VoteControllerActions.NEUTRAL)
		return [votes - 1, E_VoteControllerActions.DOWNVOTE];
	if (prevAction === E_VoteControllerActions.DOWNVOTE)
		return [votes + 1, E_VoteControllerActions.NEUTRAL];
	if (prevAction === E_VoteControllerActions.UPVOTE)
		return [votes - 2, E_VoteControllerActions.DOWNVOTE];

	return [0, E_VoteControllerActions.NEUTRAL];
}
