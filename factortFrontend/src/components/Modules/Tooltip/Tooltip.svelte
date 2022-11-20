<script lang="ts">
	import { createObjectCubeClass, createStringCubeCSSClass } from '../../../utils/cubeCss/cubeCss';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Card from '../Card/Card.svelte';
	import { reboundTooltip } from '../../../utils/contextMenu/contextMenu';

	onMount(() => {
		_this.addEventListener('mouseenter', () => {
			show = true;
			reboundTooltip(_this.querySelector('.tooltip')!);
		});
		_this.addEventListener('mouseleave', () => {
			show = false;
			reboundTooltip(_this.querySelector('.tooltip')!);
		});
	});

	export let cubeClass = createObjectCubeClass();
	export let explicitShow = false;
	export let workCondition = false;

	let _this: HTMLElement;
	let _class = createStringCubeCSSClass(cubeClass, {
		blockClass: 'tooltip-container',
		utilClass: 'pos-relative z-index-999'
	});

	let show: boolean = false;
</script>

<div class={_class} bind:this={_this}>
	<slot />

	<div class="[ z-index-999 ]" data-absolute-hide={!(workCondition && (explicitShow || show))}>
		<Card
			cubeClass={{ blockClass: 'tooltip', utilClass: 'pos-absolute z-index-999' }}
			variant="dark"
			padding={1}
		>
			<slot name="tooltip" />
		</Card>
	</div>
</div>
