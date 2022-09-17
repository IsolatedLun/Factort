<script>
	import Navbar from "../components/Layouts/Navbar.svelte";
</script>

<Navbar />
<div class="[ main-container ]">
    <slot />
</div>

<style>
	@import url('../../static/posty.css');
</style>
