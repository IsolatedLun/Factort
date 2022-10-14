<script lang="ts">
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import { createDefaultPost } from '../../../utils/defaultProps';
	import ContextMenu from '../ContextMenu/ContextMenu.svelte';
	import type { Props_PreviewPost } from './types';
	import { onMount } from 'svelte';
	import { toggleContextMenu } from '../../../utils/contextMenu/contextMenu';
	import ContextMenuItem from '../ContextMenu/ContextMenuItem.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import { ICON_COMMENTS, WEB_POST_URL } from '../../../consts';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';

	import PostImages from './_/PostImages.svelte';
	import PostVideo from './_/PostVideo.svelte';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import VoteController from '../../../components/Modules/VoteController/VoteController.svelte';

	onMount(() => {
		postElementId = crypto.randomUUID();

		_this.addEventListener('mouseenter', () => _this.focus());
		_this.addEventListener('mouseleave', () => _this.blur());
		_this.addEventListener('keypress', handleKeyPress);
	});

	function handleContextMenu(e: MouseEvent) {
		toggleContextMenu(e, postElementId);
	}

	function handleKeyPress(e: KeyboardEvent) {
		if (e.code === 'KeyD') imageKeyEventIdx++;
		else if (e.code === 'KeyA') imageKeyEventIdx--;

		// This hacky solution is used, because when the user presses/holds down 'A' more than once
		// the component does not update, thus the 'imageKeyEventIdx' does not change
		doReRender++;
	}

	export let props: Props_PreviewPost = createDefaultPost({
		type: 'link',
		data: 'https://www.google.com'
	});
	export let isInThread = false;

	let postElementId = '';
	let collapsePost = false;
	let slideshowMode = false;

	// if the post type is image, this variable is used to change the image index
	let imageKeyEventIdx: number = 0;

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
		<Flexy gap={2} justify="start">
			<DynamicLabel props={{ type: 'user', data: props.user }} />
			<p class="[ fs-300 ] [ clr-text-muted ]">{props.date_created}</p>
		</Flexy>
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
			<article class="[ padding-2 ]">
				{props.content.data}
			</article>
		{:else if props.content.type === 'images'}
			<PostImages
				on:keyChange={(e) => (imageKeyEventIdx = e.detail.value)}
				images={props.content.data}
				{slideshowMode}
				{imageKeyEventIdx}
			/>
		{:else if props.content.type === 'video'}
			<PostVideo
				videoSrc={props.content.data.url}
				isThirdParty={props.content.data.is_third_party}
			/>
		{:else if props.content.type === 'link'}
			<div class="[ padding-2 ]">
				<a target="_blank" href={props.content.data}>{props.content.data}</a>
			</div>
		{/if}
	</section>
	<Card
		tag="footer"
		variant="difference"
		secondaryVariant="default-background"
		cubeClass={{ blockClass: 'post__footer', utilClass: 'padding-1' }}
	>
		<Flexy>
			{#if !isInThread}
				<Button
					variant="difference"
					secondaryVariant="small"
					to={WEB_POST_URL(props.id, props.title)}>Open thread</Button
				>
			{/if}

			<VoteController />

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
