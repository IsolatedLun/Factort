import { propOrDefault } from '../cubeCss/cubeCss';
import type { Props_VisitedPost } from './types';

/**
 * @param posts
 * @summary Adds the post to the history and returns all visited posts
 */
export function addPostToHistory(post: Props_VisitedPost) {
	let posts = JSON.parse(localStorage.getItem('visitedPosts') ?? '[]') as Props_VisitedPost[];

	if (posts && posts[0] && posts[0].id === -1) posts = posts.slice(1);

	posts.push(post);
	localStorage.setItem('visitedPosts', JSON.stringify(posts));

	return posts;
}

/**
 * @param posts
 * @summary Updates the post history depending on the current history state
 */
export function updatePostHistory(posts: Props_VisitedPost[]) {
	localStorage.setItem('visitedPosts', JSON.stringify(posts));
}

/**
 * @summary Returns all visited posts
 */
export function getPostsFromHistory() {
	const posts = localStorage.getItem('visitedPosts') ?? '[]';

	return JSON.parse(posts);
}
