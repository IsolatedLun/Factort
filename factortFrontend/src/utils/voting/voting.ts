import { PostVoteTypes } from '../../components/Layouts/Post/types';

export function upvote(votes: number, prevAction: PostVoteTypes): [number, PostVoteTypes] {
	if (prevAction === PostVoteTypes.NEUTRAL) return [votes + 1, PostVoteTypes.UPVOTE];
	if (prevAction === PostVoteTypes.UPVOTE) return [votes - 1, PostVoteTypes.NEUTRAL];
	if (prevAction === PostVoteTypes.DOWNVOTE) return [votes + 2, PostVoteTypes.UPVOTE];

	return [0, PostVoteTypes.NEUTRAL];
}

export function downvote(votes: number, prevAction: PostVoteTypes): [number, PostVoteTypes] {
	if (prevAction === PostVoteTypes.NEUTRAL) return [votes - 1, PostVoteTypes.DOWNVOTE];
	if (prevAction === PostVoteTypes.DOWNVOTE) return [votes + 1, PostVoteTypes.NEUTRAL];
	if (prevAction === PostVoteTypes.UPVOTE) return [votes - 2, PostVoteTypes.DOWNVOTE];

	return [0, PostVoteTypes.NEUTRAL];
}
