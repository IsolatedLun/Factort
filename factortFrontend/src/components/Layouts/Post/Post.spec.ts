import { it, expect } from 'vitest';
import { render, act } from '@testing-library/svelte';
import { createDefaultPost } from 'src/utils/defaultProps';
import Post from './Post.svelte';
import type { Props_PreviewPost } from './types';

it('Tests a post that has 5 images', async () => {
	const data: Props_PreviewPost = createDefaultPost({
		type: 'images',
		data: ['1', '2', '3', '4', '5']
	});
	const { getByText } = render(Post, { props: { props: data } });

	let imgSrc = '';

	const dots = document.querySelectorAll('.dot') as NodeListOf<HTMLButtonElement>;
	imgSrc = (document.querySelector('img') as HTMLImageElement).src;

	// Always shows the 1st image
	expect(imgSrc).toBe('1');
	// 5 images => 5 dots
	expect(dots.length).toBe(5);

	await act(() => [dots[3].click()]);

	imgSrc = (document.querySelector('img') as HTMLImageElement).src;
	expect(imgSrc).toBe('3');
});

it('Tests a post that with text', async () => {
	const data: Props_PreviewPost = createDefaultPost({
		type: 'text',
		data: 'Hello World'
	});
	const { getByText } = render(Post, { props: { props: data } });

	expect(getByText('Hello World')).toBeTruthy();
});
