export function clearCanvas(canvas: HTMLCanvasElement) {
	const ctx = canvas.getContext('2d')!;

	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function canvasToImage(canvas: HTMLCanvasElement) {
	return canvas.toDataURL('image/png');
}

export function stringRGBToArray(rgb: string): number[] {
	const res = rgb
		.replace('rgb', '')
		.replace('(', '')
		.replace(')', '')
		.split(',')
		.map((x) => Number(x));

	if (res.includes(NaN)) return [0, 0, 0];
	return res;
}

export function invertRGB(rgb: number[]): number[] {
	return [255 - rgb[0], 255 - rgb[1], 255 - rgb[2]];
}

export function noisify(canvas: HTMLCanvasElement, strength: number = 1) {
	const ctx = canvas.getContext('2d')!;
	const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const pixels = imgData.data;

	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i] = 255 * Math.random() * strength;
		pixels[i + 1] = 255 * Math.random() * strength;
		pixels[i + 2] = 255 * Math.random() * strength;
	}

	ctx.putImageData(imgData, 0, 0);
}

export function bucket(canvas: HTMLCanvasElement, color: string) {
	const ctx = canvas.getContext('2d')!;

	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '';
}
