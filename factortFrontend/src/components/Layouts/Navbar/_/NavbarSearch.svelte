<script lang="ts">
	import DynamicLabel from '../../../../components/Modules/Misc/DynamicLabel.svelte';
	import { _Search_Bar } from '../../../../services/search/searchFetchers';
	import type { Data_SearchResults } from 'src/services/search/types';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import TextInput from '../../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { ICON_SEARCH } from '../../../../consts';
	import Card from '../../../../components/Modules/Card/Card.svelte';

	function fetchSearchBar() {
		_Search_Bar(query).then((res) => {
			if (res.type === 'success') results = res.data;
		});
	}

	export let showStickyInput: boolean;

	let results: Data_SearchResults = { users: [], communities: [] };
	let query: string = '';
</script>

<div class="[  ]" data-show-sticky-input={showStickyInput} data-desktop>
	<TextInput
		cubeClass={{ utilClass: 'navbar__search-input' }}
		placeholder="Search"
		label="Search"
		bind:value={query}
		on:_input={fetchSearchBar}
		endIcon={ICON_SEARCH}
	>
		<Flexy
			cubeClass={{ utilClass: 'width-100 margin-block-end-1 clr-text-muted padding-block-end-1' }}
			use={(e) => e.setAttribute('data-typo-underline', 'true')}
		>
			<p><b>USERS</b></p>
			<p class="[ clr-text-muted fs-300 ]" aria-hidden="true">(Top 3 results)</p>
		</Flexy>
		<Flexy cubeClass={{ utilClass: 'fs-350' }} useColumn={true} gap={2}>
			{#each results.users as user}
				<DynamicLabel baseFontSize={300} props={{ type: 'user', data: user }} />
			{/each}

			{#if results.users.length === 0}
				<Card
					cubeClass={{ utilClass: 'width-100 text-center' }}
					variant="error-difference"
					padding={1}>No users found</Card
				>
			{/if}
		</Flexy>

		<!--===================================================-->

		<Flexy
			cubeClass={{ utilClass: 'width-100 margin-block-1 clr-text-muted padding-block-end-1' }}
			use={(e) => e.setAttribute('data-typo-underline', 'true')}
		>
			<p><b>COMMUNITIES</b></p>
			<p class="[ clr-text-muted fs-300 ]" aria-hidden="true">(Top 3 results)</p>
		</Flexy>
		<Flexy cubeClass={{ utilClass: 'fs-350' }} useColumn={true} gap={2}>
			{#each results.communities as community}
				<DynamicLabel baseFontSize={300} props={{ type: 'community', data: community }} />
			{/each}

			{#if results.communities.length === 0}
				<Card
					cubeClass={{ utilClass: 'width-100 text-center' }}
					variant="error-difference"
					padding={1}>No communities found</Card
				>
			{/if}
		</Flexy>
	</TextInput>
</div>
