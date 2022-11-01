<script lang="ts">
	import Card from '../../../components/Modules/Card/Card.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import CardWithHeader from '../../../components/Modules/Card/CardWithHeader.svelte';
	import type { Props_MiscellaneousSection } from './types';
	import DynamicLabel from '../../../components/Modules/Misc/DynamicLabel.svelte';

	export let sections: Props_MiscellaneousSection[] = [];
</script>

<Flexy useColumn={true} gap={2}>
	{#each sections as section}
		{#if section.fetchFn}
			{#await section.fetchFn(section.id) then res}
				{#if res.type === 'success'}
					{#if res.data.type === 'community' && res.data.data.length > 0}
						<CardWithHeader
							cubeClass={{ utilClass: 'width-100' }}
							variant="dark"
							title="Joined Communities"
						>
							<Flexy useColumn={true} cubeClass={{ utilClass: 'padding-1' }}>
								{#each res.data.data as community}
									<DynamicLabel props={{ type: 'community', data: community }} />
								{/each}
							</Flexy>
						</CardWithHeader>
					{/if}
					{#if res.data.type === 'moderator' && res.data.data.length > 0}
						<CardWithHeader
							cubeClass={{ utilClass: 'width-100' }}
							variant="dark"
							title={section.title}
						>
							<Flexy useColumn={true} cubeClass={{ utilClass: 'padding-1' }}>
								{#each res.data.data as moderator}
									<DynamicLabel props={{ type: 'user', data: moderator }} />
								{/each}
							</Flexy>
						</CardWithHeader>
					{/if}
				{/if}
			{/await}
		{:else if section.type === 'footer'}
			<Card cubeClass={{ utilClass: 'width-100' }} variant="dark" padding={1}>
				<p>FOOTER</p>
			</Card>
		{/if}
	{/each}
</Flexy>
