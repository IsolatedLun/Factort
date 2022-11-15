<script>
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import SkeletronPlane from '../SkeletronPlane.svelte';
	import SkeletronProfile from '../SkeletronProfile.svelte';
	import SkeletronText from '../SkeletronText.svelte';
	import SkeletronUser from './SkeletronUser.svelte';
</script>

<div class="[ skeletron-post ] [ width-100 ]">
	<Flexy justify="space-between" gap={2}>
		<SkeletronUser />

		<SkeletronText variant="small">oooooooo</SkeletronText>
	</Flexy>

	<div class="[ margin-block-start-2 ]">
		<SkeletronPlane />
	</div>
</div>
