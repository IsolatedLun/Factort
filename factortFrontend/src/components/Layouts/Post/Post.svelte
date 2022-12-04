<script lang="ts">
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import { createDefaultPost } from '../../../utils/defaultProps';
	import ContextMenu from '../ContextMenu/ContextMenu.svelte';
	import { E_PostVisibilityTypes, type Props_PreviewPost } from './types';
	import { onMount } from 'svelte';
	import { toggleContextMenu } from '../../../utils/contextMenu/contextMenu';
	import ContextMenuItem from '../ContextMenu/ContextMenuItem.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import {
		BACKEND_ROOT_URL,
		CREATE_MODAL_ID,
		ICON_COMMENTS,
		MAX_PREVIEW_POST_TEXT_LEN,
		MIN_TITLE_LEN,
		POST_TYPE_TO_ICON,
		WEB_COMMUNITY_URL,
		WEB_POST_URL
	} from '../../../consts';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';

	import PostImages from './_/PostImages.svelte';
	import PostVideo from './_/PostVideo.svelte';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import VoteController from '../../../components/Modules/VoteController/VoteController.svelte';
	import { propOrDefault } from '../../../utils/cubeCss/cubeCss';
	import PostYoutubeUrl from './_/PostYoutubeUrl.svelte';
	import { isValidYoutubeLink } from '../../../utils/regex/all';
	import { _Delete_Post, _Update_Post, _Vote_Post } from '../../../services/posts/postFetchers';
	import AudioVisualizer from '../../../components/Modules/AudioVisualizer/AudioVisualizer.svelte';
	import Modal from '../../../components/Modules/Modal/Modal.svelte';
	import { globalStore } from '../../../stores/global';
	import { closeModal, openModal } from '../../../utils/modal/modal';
	import TextInput from '../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { minLenValidator } from '../../../utils/form4Svelte/validators';
	import { goto } from '$app/navigation';
	import Tag from '../../../components/Modules/Tag/Tag.svelte';

	onMount(() => {
		if (!postElementId) postElementId = crypto.randomUUID();
		modalId = CREATE_MODAL_ID(postElementId);

		_this.addEventListener('mouseenter', () => _this.focus());
		_this.addEventListener('mouseleave', () => _this.blur());
		_this.addEventListener('keypress', handleKeyPress);
	});

	function deletePost() {
		_Delete_Post(props.id).then(() => {
			closeModal(modalId);
			window.location.replace(WEB_POST_URL(props.id, 'deleted'));
		});
	}

	function updatePost() {
		_Update_Post(props.id, { title: props.title }).then(() => {
			closeModal(modalId);
			goto(WEB_POST_URL(props.id, props.title));
		});
	}

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

	function openImageInNewTab() {
		window.open(BACKEND_ROOT_URL + props.content.data[imageKeyEventIdx], '_blank');
	}

	export let props: Props_PreviewPost = createDefaultPost({
		type: 'link',
		data: 'https://www.google.com'
	});
	export let isInThread = false;
	export let postElementId = '';

	let collapsePost = false;
	let slideshowMode = false;

	let isEditedTitleValid = false;
	let modalId = '';

	// if the post type is image, this variable is used to change the image index
	let imageKeyEventIdx: number = 0;

	let _this: HTMLElement;
	let doReRender = 0;
</script>

<div
	bind:this={_this}
	class="[ post ] [ width-100 pos-relative ]"
	tabindex="-1"
	on:contextmenu={handleContextMenu}
	data-collapse={collapsePost}
	data-allow-outline="false"
	data-tooltip-parent=""
>
	<Card
		tag="header"
		variant="difference"
		secondaryVariant="default-background"
		cubeClass={{ utilClass: 'padding-inline-2 padding-block-start-1' }}
	>
		<Flexy gap={2} align="start" justify="start">
			<DynamicLabel props={{ type: 'user', data: props.user }} />
			<Flexy cubeClass={{ utilClass: 'width-100' }} justify="space-between">
				<Flexy gap={2} align="center">
					<p class="[ fs-300 ] [ clr-text-muted ]">{props.date_created}</p>
					{#if props.community && props.community.type === 'community'}
						<Tag>
							on
							<a href={WEB_COMMUNITY_URL(props.community.data.id, props.community.data.name)}
								>g/{props.community.data.name}</a
							>
						</Tag>
					{/if}

					{#if props.is_edited}
						<Tag variant="downvote">Edited</Tag>
					{/if}
					{#if props.visibility === E_PostVisibilityTypes.UNLISTED}
						<Tag variant="upvote">Unlisted</Tag>
					{/if}
				</Flexy>
				<Icon cubeClass={{ utilClass: 'clr-text-primary fs-300' }}
					>{propOrDefault(POST_TYPE_TO_ICON[props.content.type], 'U')}</Icon
				>
			</Flexy>
		</Flexy>
		<TypoHeader
			h={2}
			fontHeadingSize={500}
			spacingPosition={'start'}
			lineClamp={3}
			wordBreakOnMobile={true}
			cubeClass={{ blockClass: 'post__title' }}
		>
			{props.title} <span class="[ visually-hidden ]">posted by {props.user.username}</span>
		</TypoHeader>
	</Card>
	<section class="[ post__content ]">
		<h2 class="[ visually-hidden ]">Post content</h2>
		{#if props.content.type === 'text'}
			<article
				class="[ markdown ] [ {!isInThread && props.content.data.length > MAX_PREVIEW_POST_TEXT_LEN
					? 'text-ellipsis-3'
					: ''} ] [ padding-2 ]"
			>
				{@html props.content.data}
			</article>

			{#if !isInThread && props.content.data.length > MAX_PREVIEW_POST_TEXT_LEN}
				<div class="[ margin-block-1 margin-inline-3 ]">
					<a href={WEB_POST_URL(props.id, props.title)}>Continue reading...</a>
				</div>
			{/if}
		{:else if props.content.type === 'images'}
			<PostImages
				on:keyChange={(e) => (imageKeyEventIdx = e.detail.value)}
				images={props.content.data}
				{slideshowMode}
				{imageKeyEventIdx}
			/>
		{:else if props.content.type === 'video'}
			<PostVideo videoSrc={props.content.data} isThirdParty={false} />
		{:else if props.content.type === 'link'}
			{#if isValidYoutubeLink(props.content.data)}
				<PostYoutubeUrl videoUrl={props.content.data} />
			{:else}
				<div class="[ padding-2 ]">
					<a target="_blank" href={props.content.data}>{props.content.data}</a>
				</div>
			{/if}
		{:else if props.content.type === 'audio'}
			<div class="[ post__audio ]">
				<AudioVisualizer url={BACKEND_ROOT_URL + props.content.data} />
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
				<Button secondaryVariant="small" to={WEB_POST_URL(props.id, props.title)}
					>Open thread</Button
				>
			{/if}

			<VoteController
				lastVoteAction={props.c_vote_action}
				votes={props.prestige}
				voteFn={_Vote_Post}
				voteFnArgs={{ postId: props.id }}
				id={props.id}
			/>

			<Flexy>
				<Button variant="difference" secondaryVariant="small" selected={true}>
					<Flexy align="center">
						<p>{Array.isArray(props.comments) ? props.comments.length : props.comments}</p>
						<Icon>{ICON_COMMENTS}</Icon>
					</Flexy>
				</Button>
			</Flexy>
		</Flexy>
	</Card>

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
				<ContextMenuItem action={openImageInNewTab}>Open image</ContextMenuItem>
			{/if}
			{#if $globalStore.userStore.isLogged && props.user.id === $globalStore.userStore.user.id}
				<ContextMenuItem action={() => openModal(modalId)}>Edit</ContextMenuItem>
			{/if}
		</ContextMenu>

		<Modal id={modalId}>
			<TextInput
				label="Title"
				showLabel={true}
				bind:value={props.title}
				bind:valid={isEditedTitleValid}
				validators={[minLenValidator(MIN_TITLE_LEN)]}
			/>

			<Flexy cubeClass={{ utilClass: 'margin-block-1' }}>
				<Button variant="downvote" on:click={deletePost}>Delete post</Button>
				<Button variant="primary" on:click={updatePost}>Save</Button>
			</Flexy>
		</Modal>
	{/key}
</div>
