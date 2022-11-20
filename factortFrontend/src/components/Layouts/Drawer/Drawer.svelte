<script lang="ts">
	import Card from '../../../components/Modules/Card/Card.svelte';
	import { COLORS } from '../../../utils/drawing/consts';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import { bucket, canvasToImage, clearCanvas, noisify } from '../../../utils/drawing/functions';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { DRAWER_LEAVE_COUNTDOWN, ICON_BUCKET, ICON_TRASH } from '../../../consts';
	import ColorCube from './_/ColorCube.svelte';
	import Miscellaneuos from '../Miscellaneous/Miscellaneuos.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';

	function handleCanvas(e: MouseEvent) {
		clearTimeout(canvasLeaveTimeout);

		if (!isHeldDown) return;

		const ctx = _canvas.getContext('2d')!;

		const centerX = e.offsetX - drawWidth / 2;
		const centerY = e.offsetY - drawHeight / 2;

		ctx.fillStyle = selectedColor;
		ctx.fillRect(centerX, centerY, drawWidth, drawHeight);
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

	let drawWidth = 20;
	let drawHeight = 20;
	let isHeldDown = false;
	let selectedColor = 'transparent';
	let _canvas: HTMLCanvasElement;
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
		<div class="[ drawer__canvas ] [ margin-inline-auto ]">
			<canvas
				class="[ margin-inline-auto pos-absolute ]"
				id="drawer-canvas"
				width="488"
				height="488"
				on:mousemove={handleCanvas}
				on:mousedown={(e) => {
					isHeldDown = true;
					handleCanvas(e);
				}}
				on:mouseleave={() => startCanvasLeave()}
				on:mouseenter={() => clearTimeout(canvasLeaveTimeout)}
				on:mouseup={() => (isHeldDown = false)}
				bind:this={_canvas}
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

		<Miscellaneuos withFooter={true} />
	</div>
</div>
