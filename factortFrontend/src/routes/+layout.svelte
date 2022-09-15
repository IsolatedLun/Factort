<script>
	import VisuallyHidden from "../components/Modules/Accessiblity/VisuallyHidden.svelte";

</script>
<navbar class="[ padding-2 display-inline-block ]" aria-labelledby="primaryNavigation">
    <h1>Factort <VisuallyHidden id='primaryNavigation'>Primary navigation</VisuallyHidden></h1>
    <ul></ul>
</navbar>

<div class="[ main-container ]">
    <slot />
</div>

<style>
	@import url('../../static/posty.css');
</style>
