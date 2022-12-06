<script lang="ts">
	import CardWithHeader from '../../../../components/Modules/Card/CardWithHeader.svelte';

	export let title: string;
</script>

<CardWithHeader cubeClass={{ utilClass: 'width-100' }} variant="dark" {title}>
	<slot />
</CardWithHeader>
