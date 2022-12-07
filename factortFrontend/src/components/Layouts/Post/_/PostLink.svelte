<script lang="ts">
	import Card from '../../../../components/Modules/Card/Card.svelte';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import type { Post_Content_Link_Data } from '../types';
	import Typography from '../../../../components/Modules/Typography/Typography.svelte';
	import Link from '../../../../components/Modules/Link/Link.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const emptyDataCount = Object.values(data).filter((x) => x === null || x === undefined).length;

		// We decrement by 1, since the url property is always not empty
		hasEnoughOgData =
			emptyDataCount - 1 !== Object.values(data).length && Object.values(data).length > 1;
	});

	export let data: Post_Content_Link_Data;

	let hasEnoughOgData = true;
</script>

<div class="[ post__link ] [ margin-2 ]">
	<p class="[ margin-block-end-1 ]">
		<Link url={data.url} secondaryVariant="bright" openInNewTab={true}>
			{data.url}
		</Link>
	</p>
	{#if hasEnoughOgData}
		<Card variant="dark" padding={1}>
			<Flexy collapseOnMobile={true} alignCenterOnMobile={true} justify="center">
				<div class="[ link__og-image ] [ border-radius-cubed ]">
					<img src={data.image} alt={data.description} />
				</div>

				<div class="[ og__content ]">
					{#if data.site_name}
						<Typography fontSize={500} fontWeight={500} spacingBottom={1}>
							{data.site_name}
						</Typography>
					{/if}
					{#if data.description}
						<p>{data.description}</p>
					{/if}
				</div>
			</Flexy>
		</Card>
	{:else}
		<Card variant="dark" padding={1}>No preview available!</Card>
	{/if}
</div>
