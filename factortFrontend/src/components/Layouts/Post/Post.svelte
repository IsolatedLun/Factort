<script lang="ts">
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import TypoHeader from '../../../components/Modules/Typography/TypoHeader.svelte';
	import { createDefaultPost } from '../../../utils/defaultProps';
	import ContextMenu from '../ContextMenu/ContextMenu.svelte';
	import type { Props_Post } from './types';
	import PostUser from './_/PostUser.svelte';
	import { onMount } from 'svelte';
	import { toggleContextMenu } from '../../../utils/contextMenu/contextMenu';
	import ContextMenuItem from '../ContextMenu/ContextMenuItem.svelte';

	onMount(() => {
		postElementId = crypto.randomUUID();
	});

	function handleContextMenu(e: MouseEvent) {
		toggleContextMenu(e, postElementId);
	}

	export let props: Props_Post<number, number> = createDefaultPost({ type: 'text', data: 'meow' });

	let postElementId = '';
	let collapsePost = false;
</script>

<div class="[ post ]" on:contextmenu={handleContextMenu} data-collapse={collapsePost}>
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
			cubeClass={{ blockClass: 'post__title', utilClass: 'margin-block-start-1' }}
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
		{/if}
	</section>
	<Card
		tag="footer"
		variant="difference"
		secondaryVariant="default-background"
		cubeClass={{ blockClass: 'post__footer', utilClass: 'padding-1' }}
	>
		<Button variant="difference" secondaryVariant="small">Open thread</Button>
	</Card>
</div>

{#key postElementId}
	<ContextMenu id={postElementId}>
		<ContextMenuItem
			action={() => (collapsePost = !collapsePost)}
			useSelected={true}
			selected={collapsePost}
		>
			Collapse post
		</ContextMenuItem>
	</ContextMenu>
{/key}
