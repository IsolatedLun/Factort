<script lang="ts">
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import CardWithHeader from '../../../components/Modules/Card/CardWithHeader.svelte';
	import type { Props_MiscellaneousSection } from './types';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';
	import MiscFooter from '../Footer/MiscFooter.svelte';
	import SkeletronMisc from '../../../components/Modules/Skeletron/components/SkeletronMisc.svelte';

	export let sections: Props_MiscellaneousSection[] = [];
	export let withFooter = true;
</script>

<Flexy cubeClass={{ utilClass: 'width-100' }} useColumn={true} gap={2}>
	{#each sections as section}
		{#if section.fetchFn}
			{#await section.fetchFn(section.id)}
				<SkeletronMisc />
			{:then res}
				{#if res.type === 'success'}
					{#if res.data.type === 'community' && res.data.data.length > 0}
						<CardWithHeader
							cubeClass={{ utilClass: 'width-100' }}
							variant="dark"
							title={section.title}
						>
							<Flexy useColumn={true} gap={2} cubeClass={{ utilClass: 'padding-1' }}>
								{#each res.data.data as community}
									<DynamicLabel props={{ type: 'community', data: community }} />
								{/each}
							</Flexy>
						</CardWithHeader>
					{/if}
					{#if res.data.type === 'user' && res.data.data.length > 0}
						<CardWithHeader
							cubeClass={{ utilClass: 'width-100' }}
							variant="dark"
							title={section.title}
						>
							<Flexy useColumn={true} cubeClass={{ utilClass: 'padding-1' }}>
								{#each res.data.data as user}
									<DynamicLabel props={{ type: 'user', data: user }} />
								{/each}
							</Flexy>
						</CardWithHeader>
					{/if}
				{/if}
			{/await}
		{/if}
	{/each}

	{#if withFooter}
		<MiscFooter />
	{/if}
</Flexy>
