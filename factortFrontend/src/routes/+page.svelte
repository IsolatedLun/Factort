<script>
	import TextArea from '../components/Modules/Interactibles/Inputs/TextArea.svelte';
	import { parseMarkdown } from '../utils/markdown/markdownParser';
	import Post from '../components/Layouts/Post/Post.svelte';

	let input = '';
</script>

<TextArea label="lol" bind:value={input} />
<div class="[ markdown ] [ margin-1 ]">
	{@html parseMarkdown(input, [])}
</div>
