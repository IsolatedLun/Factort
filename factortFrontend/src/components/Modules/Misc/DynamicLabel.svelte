<script lang="ts">
	import { combineObjectCubeClasses, createObjectCubeClass } from '../../../utils/cubeCss/cubeCss';
	import Typography from '../../../components/Modules/Typography/Typography.svelte';
	import Flexy from '../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Profile from '../../../components/Modules/User/Profile.svelte';
	import type { DynamicLabelVariants, Props_DynamicLabel_Complex_Type } from './types';
	import { WEB_COMMUNITY_URL, WEB_USER_URL } from '../../../consts';

	export let cubeClass = createObjectCubeClass();
	export let props: Props_DynamicLabel_Complex_Type;
	export let statFontSize = 300;
	export let baseFontSize = 400;
	export let variant: DynamicLabelVariants = 'default';
	export let responsive: boolean = false;

	const _combinedClass = combineObjectCubeClasses(cubeClass, {
		blockClass: `dynamic-label`
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
					<a data-variant="default" href={WEB_USER_URL(props.data.id, props.data.username)}
						>u/{props.data.username}</a
					>
				{:else}
					<small>u/ </small><big>{props.data.username}</big>
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
			variant={variant === 'view' ? 'big' : 'default'}
			alt={props.data.name + ' community profile'}
		/>
		<Flexy useColumn={true} gap={'05'} cubeClass={{ utilClass: `fs-${baseFontSize}` }}>
			{#if variant !== 'view'}
				<a data-variant="default" href={WEB_COMMUNITY_URL(props.data.id, props.data.name)}
					>g/{props.data.name}</a
				>
			{:else}
				{props.data.name}
			{/if}
			<Typography fontSize={statFontSize} cubeClass={{ blockClass: 'dynamic-label__stat' }}
				>{props.data.members} members</Typography
			>
		</Flexy>
	</Flexy>
{/if}
