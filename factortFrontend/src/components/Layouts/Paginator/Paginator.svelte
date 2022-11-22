<script lang="ts">
	import type { Success_OR_Error__Response } from 'src/services/types';
	import { onMount, SvelteComponent } from 'svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import type { PaginatedResponse, PaginationFetcherFn } from 'src/services/posts/types';
	import type { KeyValue } from 'src/types';

	onMount(() => {
		let options = {
			root: null,
			rootMargin: '0px',
			threshold: 0.25
		};

		observer = new IntersectionObserver(handleIntersection, options);
		observer.observe(_div);
	});

	function handleIntersection(
		entries: IntersectionObserverEntry[],
		observer: IntersectionObserver
	) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				_fetch();
				break;
			}
		}
	}

	// This function is a wrapper for the fetchFn
	// It is called everytime the observer detects an intersection (at the bottom of the posts)
	// It receives the next_page_number and posts, if the next_page_number is null
	// Then we have reached the end and don't send a request again
	async function _fetch() {
		if (end) return;

		const res = (await fetchFn({ ...fetchFnArgs, page })) as Success_OR_Error__Response<
			PaginatedResponse<any>
		>;

		if (res.type === 'success') {
			isSuccess = true;

			_items = [..._items, ...res.data.data];

			if (res.data.next_page) page = res.data.next_page;
			else end = true;
		}
	}

	export let skeletronComponent: typeof SvelteComponent;
	export let itemComponent: typeof SvelteComponent;

	export let fetchFn: PaginationFetcherFn<any>;
	export let fetchFnArgs: KeyValue<string | number> = {};
	export let errText: string = 'No items found';

	let _items: any[] = [];
	let _div: HTMLElement;
	let page = 1;
	let observer;
	let end: boolean = false;
	let isSuccess: boolean = false;
</script>

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
	{:else}
		<Card
			cubeClass={{ utilClass: 'text-center margin-block-2' }}
			variant="error-difference"
			padding={2}
		>
			<p class="[ fs-500 clr-text-error ]">{errText}</p>
		</Card>
	{/if}
{/await}

{#if !end}
	<div id="post-intersection" class="[ margin-block-start-2 ]" bind:this={_div} aria-hidden="true">
		<svelte:component this={skeletronComponent} />
	</div>
{/if}
