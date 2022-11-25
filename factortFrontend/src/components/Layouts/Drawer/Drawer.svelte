<script lang="ts">
	import Card from '../../../components/Modules/Card/Card.svelte';
	import { COLORS } from '../../../utils/drawing/consts';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import {
		bucket,
		canvasToImage,
		clearCanvas,
		invertRGB,
		noisify,
		stringRGBToArray
	} from '../../../utils/drawing/functions';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { DRAWER_LEAVE_COUNTDOWN, ICON_BUCKET, ICON_TRASH } from '../../../consts';
	import ColorCube from './_/ColorCube.svelte';
	import Miscellaneuos from '../Miscellaneous/Miscellaneuos.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import { onMount } from 'svelte';
	import RangeInput from '../../../components/Modules/Interactibles/Inputs/RangeInput.svelte';

	onMount(() => {
		bucket(_canvas, 'white');
	});

	function handleCanvas(e: MouseEvent) {
		clearTimeout(canvasLeaveTimeout);

		if (!isHeldDown) return;

		const ctx = _canvas.getContext('2d')!;

		const centerX = e.offsetX - brushSize / 2;
		const centerY = e.offsetY - brushSize / 2;

		ctx.fillStyle = selectedColor;

		ctx.fillRect(centerX, centerY, brushSize, brushSize);
	}

	function handleCanvasOverlay(e: MouseEvent) {
		const ctx = _overlayCanvas.getContext('2d')!;

		const centerX = e.offsetX - brushSize / 2;
		const centerY = e.offsetY - brushSize / 2;

		_colorConverter.style.color = selectedColor;
		const color = window.getComputedStyle(_colorConverter).color;
		const [r, g, b] = invertRGB(stringRGBToArray(color));

		ctx.clearRect(0, 0, _overlayCanvas.width, _overlayCanvas.height);
		ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.65)`;
		ctx.fillRect(centerX, centerY, brushSize, brushSize);
	}

	function startCanvasLeave() {
		canvasLeaveTimeout = setTimeout(() => {
			isHeldDown = false;
		}, DRAWER_LEAVE_COUNTDOWN);
	}

	function clearHeldDown() {
		isHeldDown = false;
		clearTimeout(canvasLeaveTimeout);
	}

	function saveImage() {
		_link.href = canvasToImage(_canvas);
		_link.click();
	}

	function addColor() {
		if (newColor) {
			customColors = [...customColors, newColor];
			newColor = null;
		}
	}

	let brushSize = 20;
	let isHeldDown = false;
	let selectedColor = 'transparent';

	let _canvas: HTMLCanvasElement;
	let _overlayCanvas: HTMLCanvasElement;
	let _colorConverter: HTMLElement;
	let _link: HTMLAnchorElement;

	let customColors: string[] = [];
	let newColor: string | null;

	let canvasLeaveTimeout: NodeJS.Timeout;
</script>

<div class="[ drawer-container ] [ gap-2 ]">
	<Card
		variant="dark"
		cubeClass={{
			blockClass: 'drawer__colors drawer__colors-grid',
			utilClass: 'padding-1 gap-1 grid'
		}}
	>
		{#each COLORS as color}
			<ColorCube
				on:select={(e) => {
					selectedColor = e.detail;
					clearHeldDown();
				}}
				{selectedColor}
				{color}
			/>
		{/each}
	</Card>
	<Flexy useColumn={true}>
		<div
			class="[ drawer__canvas ] [ margin-inline-auto ]"
			on:mousemove={handleCanvas}
			on:mousedown={(e) => {
				isHeldDown = true;
				handleCanvas(e);
			}}
			on:mouseleave={() => startCanvasLeave()}
			on:mouseenter={() => clearTimeout(canvasLeaveTimeout)}
			on:mouseup={() => (isHeldDown = false)}
		>
			<canvas
				class="[ margin-inline-auto pos-absolute ]"
				id="drawer-canvas"
				width="488"
				height="488"
				bind:this={_canvas}
			/>
			<canvas
				class="[ margin-inline-auto pos-absolute ]"
				id="drawer-canvas"
				width="488"
				height="488"
				on:mousemove={handleCanvasOverlay}
				bind:this={_overlayCanvas}
			/>
		</div>

		<Flexy align="center" justify="space-between" cubeClass={{ utilClass: 'width-100' }}>
			<Button variant="primary" on:click={saveImage}>Save Image</Button>

			<Flexy align="center">
				<input type="color" bind:value={newColor} />
				<Button variant="primary" on:click={addColor}>Add Color</Button>
			</Flexy>
		</Flexy>

		<a data-hide="true" aria-hidden="true" href="/" download="myArt" bind:this={_link}>dud</a>
	</Flexy>

	<Card variant="dark" cubeClass={{ blockClass: 'drawer__controls', utilClass: 'padding-1' }}>
		<div class="[ grid-repeater-2 ]">
			<div class="[ drawer__brushes ]">
				<div class="[ drawer__colors ]">
					<ColorCube preserveSize={true} color={selectedColor} />
				</div>
			</div>
			<div class="[ drawer__tools ]">
				<Button variant="tool" on:click={() => clearCanvas(_canvas)}
					><Icon>{ICON_TRASH}</Icon></Button
				>
				<Button variant="tool" on:click={() => noisify(_canvas)}>N</Button>
				<Button variant="tool" on:click={() => bucket(_canvas, selectedColor)}
					><Icon>{ICON_BUCKET}</Icon></Button
				>
			</div>
		</div>
	</Card>

	<div class="[ drawer__menu ]">
		<Flexy useColumn={true} gap={2} cubeClass={{ utilClass: 'margin-block-2' }}>
			{#if customColors.length > 0}
				<Card
					variant="dark"
					cubeClass={{
						blockClass: 'drawer__colors',
						utilClass: 'padding-1 gap-1 grid margin-block-end-2'
					}}
				>
					{#each customColors as color}
						<ColorCube
							on:select={(e) => {
								selectedColor = e.detail;
								clearHeldDown();
							}}
							{selectedColor}
							{color}
						/>
					{/each}
				</Card>
			{/if}

			<Card variant="dark" padding={1} cubeClass={{ utilClass: 'width-100' }}>
				<RangeInput label="Brush size" unit="px" min={20} bind:value={brushSize} />
			</Card>
		</Flexy>

		<Miscellaneuos withFooter={true} />
	</div>

	<span aria-hidden="true" data-hide="true" bind:this={_colorConverter} />
</div>
