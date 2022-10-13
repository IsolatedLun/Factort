<script>
	import { BACKEND_ROOT_URL } from '../../../consts';
	import Image from '../../../components/Misc/MediaElements/Image.svelte';
	import { combineObjectCubeClasses, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';

	export let src = '';
	export let alt = '';
	export let cubeClass = createObjectCubeClass();

	const _class = combineObjectCubeClasses(cubeClass, {
		compostClass: 'profile',
		utilClass: 'border-radius-cubed'
	});
</script>

<Image props={{ src: BACKEND_ROOT_URL + src, alt }} isProfile={true} cubeClass={_class} />
