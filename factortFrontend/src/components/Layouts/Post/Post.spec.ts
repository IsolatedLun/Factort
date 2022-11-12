import { it, expect } from 'vitest';
import { render, act } from '@testing-library/svelte';
import { createDefaultPost } from 'src/utils/defaultProps';
import Post from './Post.svelte';
import type { Props_PreviewPost } from './types';

it('Tests a post that has 5 images', async () => {
	const data: Props_PreviewPost = createDefaultPost({
		type: 'images',
		data: ['/1', '/2', '/3', '/4', '/5']
	});
	const { getByText } = render(Post, { props: { props: data, postElementId: 'test' } });

	let imgSrc = '';

	const dots = document.querySelectorAll('.dot') as NodeListOf<HTMLButtonElement>;
	imgSrc = (document.querySelector('.post__images img') as HTMLImageElement).src;

	// Always shows the 1st image
	expect(imgSrc).toBe('http://localhost:8000/1');
	// 5 images => 5 dots
	expect(dots.length).toBe(5);

	// Select 3rd image
	await act(() => [dots[2].click()]);

	imgSrc = (document.querySelector('.post__images img') as HTMLImageElement).src;
	expect(imgSrc).toBe('http://localhost:8000/3');
});

it('Tests a post that with text', async () => {
	const data: Props_PreviewPost = createDefaultPost({
		type: 'text',
		data: 'Hello World'
	});
	const { getByText } = render(Post, { props: { props: data, postElementId: 'test' } });

	expect(getByText('Hello World')).toBeTruthy();
});

it('Tests a post that with an video', async () => {
	const data: Props_PreviewPost = createDefaultPost({
		type: 'video',
		data: '/An_Video_Source'
	});
	const { getByText } = render(Post, { props: { props: data, postElementId: 'test' } });

	const videoEl = document.querySelector('video') as HTMLVideoElement;

	expect(videoEl.src).toBe('http://localhost:8000/An_Video_Source');
});
