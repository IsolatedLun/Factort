<script lang="ts">
	import DynamicLabel from '../../../../components/Modules/Misc/DynamicLabel.svelte';
	import { _Search_Bar } from '../../../../services/search/searchFetchers';
	import type { Data_SearchResults } from 'src/services/search/types';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import TextInput from '../../../../components/Modules/Interactibles/Inputs/TextInput.svelte';
	import { ICON_SEARCH, SEARCH_TIMEOUT, WEB_POST_URL } from '../../../../consts';
	import Card from '../../../../components/Modules/Card/Card.svelte';
	import type { TextInputDropdownDisplayModes } from '../../../../components/Modules/Interactibles/Inputs/types';
	import SkeletronUser from '../../../../components/Modules/Skeletron/components/SkeletronUser.svelte';

	function fetchSearchBar() {
		clearTimeout(countdownTimeout);
		isCountingDown = true;

		countdownTimeout = setTimeout(() => {
			_Search_Bar(query).then((res) => {
				if (res.type === 'success') results = res.data;

				isCountingDown = false;
			});
		}, SEARCH_TIMEOUT);
	}

	export let state: TextInputDropdownDisplayModes = 'absolute';
	export let hide: boolean = false;

	let results: Data_SearchResults = { users: [], communities: [], posts: [] };
	let query: string = '';
	let countdownTimeout: NodeJS.Timeout;
	let isCountingDown = false;
</script>

<div data-state={state} data-hide={hide}>
	<TextInput
		cubeClass={{ utilClass: 'navbar__search-input' }}
		placeholder="Search"
		label="Search"
		dropdownDisplayMode={state}
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

			{#if results.users.length === 0 && !isCountingDown}
				<Card
					cubeClass={{ utilClass: 'width-100 text-center' }}
					variant="error-difference"
					padding={1}>No users found</Card
				>
			{/if}

			{#if isCountingDown}
				<SkeletronUser />
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

			{#if results.communities.length === 0 && !isCountingDown}
				<Card
					cubeClass={{ utilClass: 'width-100 text-center' }}
					variant="error-difference"
					padding={1}>No communities found</Card
				>
			{/if}

			{#if isCountingDown}
				<SkeletronUser />
			{/if}
		</Flexy>

		<Flexy
			cubeClass={{ utilClass: 'width-100 margin-block-start-1 clr-text-muted padding-block-end-1' }}
			use={(e) => e.setAttribute('data-typo-underline', 'true')}
		>
			<p><b>POSTS</b></p>
			<p class="[ clr-text-muted fs-300 ]" aria-hidden="true">(Top 3 results)</p>
		</Flexy>
		<Flexy cubeClass={{ utilClass: 'fs-350' }} useColumn={true} gap={2}>
			<ol class="[ margin-inline-start-2 ]">
				{#each results.posts as post}
					<li>
						<p class="[ text-ellipsis-2 ]">
							<a href={WEB_POST_URL(post.id, post.title)}>{post.title}</a>
						</p>
					</li>
				{/each}
			</ol>

			{#if results.posts.length === 0 && !isCountingDown}
				<Card
					cubeClass={{ utilClass: 'width-100 text-center' }}
					variant="error-difference"
					padding={1}>No posts found</Card
				>
			{/if}

			{#if isCountingDown}
				<SkeletronUser />
			{/if}
		</Flexy>
	</TextInput>
</div>
