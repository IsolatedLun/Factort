<script>
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import SkeletronMisc from '../components/SkeletronMisc.svelte';
	import SkeletronPost from '../components/SkeletronPost.svelte';
	import SkeletronUser from '../components/SkeletronUser.svelte';
	import SkeletronProfile from '../SkeletronProfile.svelte';
	import SkeletronText from '../SkeletronText.svelte';
</script>

<div class="[ skeletron-user-view ]">
	<Flexy justify="space-between" gap={2}>
		<SkeletronUser profileVariant="big" />

		<div class="[ margin-block-start-auto ]">
			<SkeletronText>oooooooooooo <br /> oooooooooooo</SkeletronText>
		</div>
	</Flexy>

	<div class="[ feed-container ] [ grid gap-2 margin-block-start-5 ]">
		<Flexy cubeClass={{ utilClass: 'width-100' }} useColumn={true} gap={2}>
			<SkeletronPost />
			<SkeletronPost />
			<SkeletronPost />
		</Flexy>

		<SkeletronMisc />
	</div>
</div>
