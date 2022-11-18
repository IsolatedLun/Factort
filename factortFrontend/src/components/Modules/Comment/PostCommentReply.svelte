<script lang="ts">
	import type { Props_PostCommentReply } from '../../../components/Layouts/Post/types';
	import Flexy from '../BoxLayouts/Flexy.svelte';
	import DynamicLabel from '../Misc/DynamicLabel.svelte';

	export let reply: Props_PostCommentReply;
</script>

<Flexy
	useColumn={true}
	cubeClass={{
		compostClass: 'under-border',
		utilClass: 'width-100 padding-block-end-1 padding-inline-end-3'
	}}
>
	<Flexy cubeClass={{ utilClass: 'width-100' }} justify="space-between">
		<DynamicLabel
			baseFontSize={300}
			statFontSize={300}
			props={{ type: 'user', data: reply.user }}
		/>

		<p class="[ clr-text-muted fs-300 ]">{reply.date_created}</p>
	</Flexy>
	<p class="[ margin-inline-start-2 fs-350 ]">{reply.text}</p>
</Flexy>
