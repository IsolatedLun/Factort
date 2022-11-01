<script lang="ts">
	import { createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import Flexy from '../BoxLayouts/Flexy.svelte';

	export let cubeClass = createObjectCubeClass();
</script>

<Flexy
	{cubeClass}
	gap={'05'}
	useColumn={true}
	tag="ul"
	use={(e) => e?.setAttribute('role', 'list')}
>
	<slot />
</Flexy>
