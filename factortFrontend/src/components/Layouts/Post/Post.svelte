<script lang="ts">
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import { createDefaultPost } from '../../../utils/defaultProps';
	import ContextMenu from '../ContextMenu/ContextMenu.svelte';
	import type { Props_Post } from './types';
	import { onMount } from 'svelte';
	import { toggleContextMenu } from '../../../utils/contextMenu/contextMenu';
	import ContextMenuItem from '../ContextMenu/ContextMenuItem.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import { ICON_COMMENTS, ICON_DOWNVOTE, ICON_UPVOTE } from '../../../consts';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';

	import PostUser from './_/PostUser.svelte';
	import PostImages from './_/PostImages.svelte';

	onMount(() => {
		postElementId = crypto.randomUUID();

		_this.addEventListener('keypress', handleKeyPress);
		_this.addEventListener('mouseenter', () => _this.focus());
		_this.addEventListener('mouseleave', () => _this.blur());
	});

	function handleContextMenu(e: MouseEvent) {
		toggleContextMenu(e, postElementId);
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.code === 'KeyD') imageKeyEventIdx++;
		else if (e.code === 'KeyA') imageKeyEventIdx--;

		// This hacky solution is used, because when the user presses 'A' more than once
		// the component does not update, thus the 'imageKeyEventIdx' does not change
		doReRender++;
	}

	export let props: Props_Post<number, number> = createDefaultPost({ type: 'images', data: [] });

	let postElementId = '';
	let collapsePost = false;
	let slideshowMode = false;
	let imageKeyEventIdx: number = 1;

	let _this: HTMLElement;
	let doReRender = 0;
</script>

<div
	bind:this={_this}
	class="[ post ]"
	tabindex="-1"
	on:contextmenu={handleContextMenu}
	data-collapse={collapsePost}
	data-allow-outline="false"
>
	<Card
		tag="header"
		variant="difference"
		secondaryVariant="default-background"
		cubeClass={{ utilClass: 'padding-inline-2 padding-block-start-1' }}
	>
		<PostUser />
		<TypoHeader
			h={2}
			fontHeadingSize={500}
			spacingPosition={'start'}
			cubeClass={{ blockClass: 'post__title' }}
		>
			{props.title} <span class="[ visually-hidden ]">posted by {props.user.username}</span>
		</TypoHeader>
	</Card>
	<section class="[ post__content ]">
		<h2 class="[ visually-hidden ]">Post content</h2>
		{#if props.content.type === 'text'}
			<article class="[ padding-inline-2 padding-block-end-2 ]">
				{props.content.data}
			</article>
		{:else if props.content.type === 'images'}
			<PostImages
				on:keyChange={(e) => (imageKeyEventIdx = e.detail.value)}
				images={[
					{ id: 1, image: '' },
					{ id: 2, image: '' },
					{ id: 3, image: '' },
					{ id: 4, image: '' }
				]}
				{slideshowMode}
				{imageKeyEventIdx}
			/>
		{:else if props.content.type === 'video'}
			<p>video</p>
		{/if}
	</section>
	<Card
		tag="footer"
		variant="difference"
		secondaryVariant="default-background"
		cubeClass={{ blockClass: 'post__footer', utilClass: 'padding-1' }}
	>
		<Flexy>
			<Button variant="difference" secondaryVariant="small">Open thread</Button>

			<Flexy
				align="center"
				cubeClass={{ utilClass: 'margin-inline-start-auto margin-inline-end-2' }}
			>
				<Button ariaLabel="Upvote post" variant="upvote-difference" secondaryVariant="small"
					><Icon>{ICON_UPVOTE}</Icon></Button
				>
				<p>0</p>
				<Button ariaLabel="Downvote post" variant="downvote-difference" secondaryVariant="small"
					><Icon>{ICON_DOWNVOTE}</Icon></Button
				>
			</Flexy>

			<Flexy>
				<Button variant="difference" secondaryVariant="small" selected={true}>
					<Flexy align="center">
						<p>0</p>
						<Icon>{ICON_COMMENTS}</Icon>
					</Flexy>
				</Button>
			</Flexy>
		</Flexy>
	</Card>
</div>

{#key postElementId}
	<ContextMenu id={postElementId}>
		<ContextMenuItem
			action={() => (collapsePost = !collapsePost)}
			useSelected={true}
			selected={collapsePost}
		>
			Collapse
		</ContextMenuItem>
		{#if props.content.type === 'images'}
			<ContextMenuItem
				action={() => (slideshowMode = !slideshowMode)}
				useSelected={true}
				selected={slideshowMode}
			>
				Slideshow
			</ContextMenuItem>
		{/if}
	</ContextMenu>
{/key}
