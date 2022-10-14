<script lang="ts">
	import { combineObjectCubeClasses, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import Typography from '../../../components/Modules/Typography/Typography.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Profile from '../../../components/Modules/User/Profile.svelte';
	import type { Props_DynamicLabel_Complex_Type } from './types';

	export let cubeClass = createObjectCubeClass();
	export let props: Props_DynamicLabel_Complex_Type;
	export let statFontSize = 300;
	export let baseFontSize = 400;

	const _combinedClass = combineObjectCubeClasses(cubeClass, {
		blockClass: `dynamic-label fs-${baseFontSize}`
	});
</script>

{#if props.type === 'user'}
	<Flexy align="start" justify="start" cubeClass={_combinedClass}>
		<Profile
			cubeClass={{ utilClass: 'overflow-hidden' }}
			src={props.data.profile}
			alt={props.data.username + ' avatar'}
		/>
		<Flexy useColumn={true} gap={'05'}>
			<p class="[ dynamic-label__name ]">
				<a data-variant="default" href={`/users/${props.data.id}/${props.data.username}`}
					>u/{props.data.username}</a
				>
			</p>
			<Typography fontSize={statFontSize} cubeClass={{ blockClass: 'dynamic-label__stat' }}
				>{props.data.prestige} prestige</Typography
			>
		</Flexy>
	</Flexy>
{:else if props.type === 'community'}
	<Flexy align="start" justify="start" cubeClass={_combinedClass}>
		<Profile
			cubeClass={{ utilClass: 'overflow-hidden' }}
			src={props.data.profile}
			alt={props.data.name + ' community profile'}
		/>
		<Flexy useColumn={true} gap={'05'}>
			<a data-variant="default" href={`/users/${props.data.id}/${props.data.name}`}
				>u/{props.data.name}</a
			>
			<Typography fontSize={statFontSize} cubeClass={{ blockClass: 'dynamic-label__stat' }}
				>{props.data.members} members</Typography
			>
		</Flexy>
	</Flexy>
{/if}
