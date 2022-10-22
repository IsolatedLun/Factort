<script lang="ts">
	import Flexy from '../../../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Image from '../../../../../../components/Misc/MediaElements/Image.svelte';
	import type { FileInputStylings, Input_Image_File } from '../../types';
	import { sizeConvert } from '../../../../../../utils/misc';
	import { StorageSizes } from '../../../../../../utils/types';
	import type { ImageDimensions } from 'src/components/Misc/MediaElements/types';

	export let id: string;
	export let fileData: Input_Image_File;
	export let styling: FileInputStylings;
	export let isInputValid: boolean;

	let dimensions: ImageDimensions = { x: 0, y: 0 };
</script>

<label
	for={id}
	class={'[ margin-block-end-1 display-inline-block margin-inline-auto ]'}
	data-variant={styling}
	data-valid={isInputValid}
>
	<div class="[ input__square-image-container ] [  border-radius-cubed ]">
		<Image
			props={{ src: fileData.data.url, alt: fileData.data.name }}
			on:dimensions={(e) => (dimensions = e.detail)}
		/>
	</div>

	<div>
		<Flexy cubeClass={{ utilClass: 'clr-text-muted margin-block-start-1' }}>
			<p>{dimensions.x} x {dimensions.y}</p>
			<p>{sizeConvert(fileData.data.size, StorageSizes.B, StorageSizes.MB)} Mb</p>
		</Flexy>
	</div>
</label>
