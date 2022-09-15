<script lang='ts'>
	import { parseMarkdown } from "../utils/markdown/markdownParser";


    let input = '';
</script>

<textarea bind:value={input}></textarea>
{#key input}
{@html parseMarkdown(input)}
{/key}