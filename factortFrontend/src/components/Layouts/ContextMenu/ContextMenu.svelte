<script>
	import Card from '../../../components/Modules/Card/Card.svelte';

	export let id = '';
</script>

<Card
	cubeClass={{ blockClass: 'context-menu', utilClass: 'pos-absolute padding-block-1' }}
	use={(e) => {
		e.setAttribute('tabindex', '-1');
		e.setAttribute('aria-hidden', 'true');

		e.id = id;
	}}
>
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<ul role="list">
		<slot />
	</ul>
</Card>
