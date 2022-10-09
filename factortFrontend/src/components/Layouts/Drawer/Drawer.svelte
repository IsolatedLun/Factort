<script lang="ts">
	import Card from '../../../components/Modules/Card/Card.svelte';
	import { COLORS } from '../../../utils/drawing/consts';
	import Button from '../../../components/Modules/Interactibles/Buttons/Button.svelte';
	import { clearCanvas } from '../../../utils/drawing/functions';
	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { DRAWER_LEAVE_COUNTDOWN, ICON_BUCKET, ICON_TRASH } from '../../../consts';
	import ColorCube from './_/ColorCube.svelte';

	function handleCanvas(e: MouseEvent) {
		clearTimeout(canvasLeaveTimeout);

		if (!isHeldDown) return;

		const ctx = _canvas.getContext('2d')!;

		const centerX = e.offsetX - drawWidth / 2;
		const centerY = e.offsetY - drawHeight / 2;

		ctx.fillStyle = selectedColor;
		ctx.fillRect(centerX, centerY, drawWidth, drawHeight);
	}

	function handleCanvasContainer(e: MouseEvent) {
		console.log('canvas left: ' + _canvas.offsetTop + ', ' + 'mouse left: ' + e.offsetX);
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

	function bucket() {
		const ctx = _canvas.getContext('2d')!;

		ctx.getImageData(0, 0, _canvas.width, _canvas.height).data.fill(0);
	}

	let drawWidth = 20;
	let drawHeight = 20;
	let isHeldDown = false;
	let selectedColor = 'transparent';
	let _canvas: HTMLCanvasElement;

	let canvasLeaveTimeout: NodeJS.Timeout;
</script>

<div class="[ drawer-container ] [ gap-2 ]" on:mousemove={handleCanvasContainer}>
	<Card
		variant="dark"
		cubeClass={{ blockClass: 'drawer__colors', utilClass: 'padding-1 gap-1 grid' }}
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
				<Button variant="tool" on:click={() => bucket()}><Icon>{ICON_BUCKET}</Icon></Button>
			</div>
		</div>
	</Card>

	<Card variant="dark" cubeClass={{ blockClass: 'drawer__menu' }} />
</div>
