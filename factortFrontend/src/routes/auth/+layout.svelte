<script>
	import { goto } from '$app/navigation';
	import { globalStore } from '../../stores/global';
	import { beforeUpdate } from 'svelte';

	beforeUpdate(() => {
		if ($globalStore.isLogged) goto('/');
	});
</script>

<slot />
