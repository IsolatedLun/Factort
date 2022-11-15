<script>
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import SkeletronMisc from '../components/SkeletronMisc.svelte';
	import SkeletronPost from '../components/SkeletronPost.svelte';
	import SkeletronBanner from '../SkeletronBanner.svelte';
	import SkeletronText from '../SkeletronText.svelte';
</script>

<div class="[ skeletron-community-view ]">
	<Flexy useColumn={true} justify="space-between" gap={2}>
		<SkeletronBanner />
		<Flexy cubeClass={{ utilClass: 'width-100' }} align="center" justify="space-between">
			<SkeletronText>ooooooooooooo</SkeletronText>
			<div class="[ margin-block-start-auto ]">
				<Flexy align="center">
					<SkeletronText variant="small">ooooooooooooooooo</SkeletronText>
					<SkeletronText>oooooooooooo <br /> oooooooooooo</SkeletronText>
				</Flexy>
			</div>
		</Flexy>
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
