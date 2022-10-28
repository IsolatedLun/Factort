<script lang="ts">
	import { combineObjectCubeClasses, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import Typography from '../../../components/Modules/Typography/Typography.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Profile from '../../../components/Modules/User/Profile.svelte';
	import type { DynamicLabelVariants, Props_DynamicLabel_Complex_Type } from './types';

	export let cubeClass = createObjectCubeClass();
	export let props: Props_DynamicLabel_Complex_Type;
	export let statFontSize = 300;
	export let baseFontSize = 400;
	export let variant: DynamicLabelVariants = 'default';
	export let responsive: boolean = false;

	const _combinedClass = combineObjectCubeClasses(cubeClass, {
		blockClass: `dynamic-label}`
	});
</script>

{#if props.type === 'user'}
	<Flexy align="start" justify="start" cubeClass={_combinedClass} collapseOnMobile={responsive}>
		<Profile
			cubeClass={{ utilClass: 'overflow-hidden' }}
			src={props.data.profile}
			variant={variant === 'view' ? 'big' : 'default'}
			alt={props.data.username + ' avatar'}
		/>
		<Flexy useColumn={true} gap={'05'} cubeClass={{ utilClass: `fs-${baseFontSize}` }}>
			<p class="[ dynamic-label__name ]">
				{#if variant !== 'view'}
					<a data-variant="default" href={`/users/${props.data.id}/${props.data.username}`}
						>u/{props.data.username}</a
					>
				{:else}
					{props.data.username}
				{/if}
			</p>
			<Typography
				fontSize={statFontSize}
				cubeClass={{ blockClass: 'dynamic-label__stat', utilClass: `fs-${statFontSize}` }}
				>{props.data.prestige} prestige</Typography
			>
		</Flexy>
	</Flexy>
{:else if props.type === 'community'}
	<Flexy align="start" justify="start" cubeClass={_combinedClass} collapseOnMobile={responsive}>
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
