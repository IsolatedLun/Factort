<script lang="ts">
	import { BACKEND_ROOT_URL, CLR_PRIMARY } from '../../../consts';
	import { onMount } from 'svelte';
	import Card from '../Card/Card.svelte';

	onMount(() => {
		const ctx = new window.AudioContext();
		const audioSource = ctx.createMediaElementSource(_audio);
		const analyser = ctx.createAnalyser();
		analyser.fftSize = fftSize;

		// Connecting to audio source, so as the audio plays, the analyser gets updated
		audioSource.connect(analyser);
		analyser.connect(ctx.destination); // Connecting to the device's speakers

		const dataArray = new Uint8Array(analyser.frequencyBinCount);

		const canvasCtx = _canvas.getContext('2d')!;
		const [canvasWidth, canvasHeight] = [_canvas.width, _canvas.height];
		function draw() {
			analyser.getByteFrequencyData(dataArray);
			canvasCtx.fillStyle = backgroundColor;
			canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

			let x = 0;
			const barWidth = (canvasWidth / analyser.frequencyBinCount) * barWidthMultiplier;
			for (let i = 0; i < dataArray.length; i++) {
				let barHeight = dataArray[i] / barHeightDivident;

				canvasCtx.fillStyle = barColor;
				canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight);
				x += barWidth + barDistance;
			}

			window.requestAnimationFrame(draw);
		}

		draw();
	});

	export let url: string;

	export let backgroundColor = 'black';
	export let barColor = CLR_PRIMARY;
	export let barWidthMultiplier = 6;
	export let barHeightDivident = 2;
	export let barDistance = 2;
	export let fftSize = 512;

	let _canvas: HTMLCanvasElement;
	let _audio: HTMLAudioElement;
</script>

<div class="[ audio-visualizer ]">
	<div class="[ grid place-items-center ]" data-desktop>
		<canvas
			class="[ visualizer__canvas ] [ margin-block-1 border-radius-cubed  ]"
			width="500"
			height="250"
			bind:this={_canvas}
		/>
	</div>
	<audio class="[ width-100 ]" bind:this={_audio} controls src={url} crossorigin="anonymous" />
</div>
