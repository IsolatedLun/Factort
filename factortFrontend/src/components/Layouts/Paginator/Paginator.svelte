<script lang="ts">
	import type { Success_OR_Error__Response } from 'src/services/types';
	import { onMount, SvelteComponent } from 'svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import type { PaginatedResponse, PaginationFetcherFn } from 'src/services/posts/types';
	import type { KeyValue } from '../../../types';
	import SelectInput from '../../../components/Modules/Interactibles/Inputs/SelectInput.svelte';
	import type { SortByTypes } from './types';
	import type { Props_SelectInputOption } from 'src/components/Modules/Interactibles/Inputs/types';

	onMount(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.25
		};

		observer = new IntersectionObserver(handleIntersection, options);
		observer.observe(_div);

		sortByName = sortByChoices[0].name;
	});

	function handleIntersection(
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				if (!isFetching) _fetch();
				break;
			}
		}
	}

	// This function is a wrapper for the fetchFn
	// It is called everytime the observer detects an intersection (at the bottom of the items)
	// It receives the next_page_number and items, if the next_page_number is null
	// Then we have reached the end and don't send a request again
	async function _fetch() {
		isFetching = true;

		if (end) {
			page = 1;
			return;
		}

		const res = (await fetchFn({
			...fetchFnArgs,
			page,
			sortBy
		})) as Success_OR_Error__Response<PaginatedResponse<any>>;

		if (res.type === 'success') {
			isSuccess = true;

			_items = [..._items, ...res.data.data];

			if (res.data.next_page) page = res.data.next_page;
			else end = true;
		}

		isFetching = false;
	}

	function updateSortBy(value: SortByTypes) {
		// Resetting all values
		sortBy = value;
		end = false;
		isSuccess = false;
		isFetching = false;
		page = 1;
		_items = [];

		let sortByValue = sortByChoices.find((x) => x.value === value);
		if (sortByValue) sortByName = sortByValue.name;

		if (!isFetching) _fetch();
	}

	export let skeletronComponent: typeof SvelteComponent;
	export let itemComponent: typeof SvelteComponent;

	export let fetchFn: PaginationFetcherFn<any>;
	export let fetchFnArgs: KeyValue<string | number> = {};
	export let errText: string = 'No items found';
	export let sortByName: string = '';

	let _items: any[] = [];
	let _div: HTMLElement;
	let page = 1;
	let observer;
	let end: boolean = false;
	let isSuccess: boolean = false;
	let sortBy: SortByTypes = '-date_created';

	// This bool is crucial to avoid fetching the same page twice
	let isFetching: boolean = false;

	let sortByChoices: Props_SelectInputOption<SortByTypes>[] = [
		{ name: 'Latest', value: '-date_created' },
		{ name: 'Top', value: '-prestige' },
		{ name: 'Most viewed', value: '-views' },
		{ name: 'Controversial', value: 'prestige' },
		{ name: 'Old', value: 'date_created' }
	];
</script>

<div class="[ margin-block-1 ]">
	<SelectInput label="Sort by" options={sortByChoices} on:change={(e) => updateSortBy(e.detail)} />
</div>

{#await _fetch()}
	<Flexy gap={2} useColumn={true}>
		<svelte:component this={skeletronComponent} />
	</Flexy>
{:then _}
	{#if isSuccess && _items.length > 0}
		<Flexy useColumn={true} gap={2}>
			{#each _items as item}
				<svelte:component this={itemComponent} props={item} />
			{/each}
		</Flexy>
	{:else if end && _items.length === 0}
		<Card
			cubeClass={{ utilClass: 'text-center margin-block-2' }}
			variant="error-difference"
			padding={2}
		>
			<p class="[ fs-500 clr-text-error ]">{errText}</p>
		</Card>
	{/if}
{/await}

<div id="post-intersection" class="[ margin-block-start-2 ]" bind:this={_div} aria-hidden="true">
	{#if !end}
		<svelte:component this={skeletronComponent} />
	{/if}
</div>
