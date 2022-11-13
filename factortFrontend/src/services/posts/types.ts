import type { PostVoteTypes } from 'src/components/Layouts/Post/types';

export interface Data_Vote_Post {
	action: PostVoteTypes;
	votes: number;
}
