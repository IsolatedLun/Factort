<script lang="ts">
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import SkeletronProfile from '../SkeletronProfile.svelte';
	import SkeletronText from '../SkeletronText.svelte';
	import type { SkeletronProfileVariants } from '../types';

	export let profileVariant: SkeletronProfileVariants = 'default';
</script>

<div class="[ skeletron-user ]">
	<Flexy justify="start">
		<SkeletronProfile variant={profileVariant} />
		<Flexy useColumn={true} gap={1}>
			<SkeletronText variant="small">oooooooooooooooo</SkeletronText>
			<SkeletronText variant="small">ooooooooo</SkeletronText>
		</Flexy>
	</Flexy>
</div>
