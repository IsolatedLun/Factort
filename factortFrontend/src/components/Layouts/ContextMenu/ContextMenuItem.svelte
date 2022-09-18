<script lang="ts">
	import { blurContextMenu } from '../../../utils/contextMenu/contextMenu';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import { ICON_CHECK, ICON_TIMES } from '../../../consts';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';

	export let action: () => void;
	export let selected = false;
	export let useSelected = false;

	let _this: HTMLElement;
</script>

<li bind:this={_this}>
	<Button
		on:click={() => {
			action();
			blurContextMenu();

			if (useSelected) selected = !selected;
		}}
		variant="none"
		cubeClass={{ compostClass: 'hoverable', utilClass: 'padding-inline-2 padding-block-1 fs-350' }}
	>
		<Flexy align="center">
			<slot />

			{#if useSelected}
				<Icon cubeClass={{ utilClass: 'clr-text-muted margin-inline-start-2' }}>
					{#if selected}
						{ICON_CHECK}
					{:else}
						{ICON_TIMES}
					{/if}
				</Icon>
			{/if}
		</Flexy>
	</Button>
</li>
