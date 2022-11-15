<script>
	import Flexy from '../../BoxLayouts/Flexy.svelte';
	import SkeletronCard from '../SkeletronCard.svelte';
	import SkeletronText from '../SkeletronText.svelte';
	import SkeletronUser from './SkeletronUser.svelte';
</script>

<div class="[ skeletron-misc ] [ width-100 ]">
	<Flexy useColumn={true}>
		<SkeletronCard padding={2}>
			<Flexy useColumn={true} gap={2}>
				<SkeletronUser />
				<SkeletronUser />
				<SkeletronUser />
			</Flexy>
		</SkeletronCard>

		<SkeletronCard padding={2}>
			<Flexy useColumn={true}>
				<SkeletronText>ooooooooooooooooooooo</SkeletronText>
				<SkeletronText>ooooooooooo</SkeletronText>
			</Flexy>
		</SkeletronCard>
	</Flexy>
</div>
