<script>
	import Image from "../../../components/Misc/MediaElements/Image.svelte";
	import { combineObjectCubeClasses, createObjectCubeClass } from "../../../utils/cubeCss/cubeCss";

    export let cubeClass = createObjectCubeClass();

    const _class = combineObjectCubeClasses(cubeClass, 
        { compostClass: 'profile', utilClass: 'border-radius-cubed' }
    )
</script>

<Image cubeClass={{ ..._class }} />