<script lang="ts">
	import Typography from '../../../..//components/Modules/Typography/Typography.svelte';
	import Flexy from '../../../../components/Modules/BoxLayouts/Flexy.svelte';
	import Profile from '../../../../components/Modules/User/Profile.svelte';
	import type { Props_User } from '../../../../types';
	import { createDefaultUser } from '../../../../utils/defaultProps';

	export let user: Props_User = createDefaultUser();
</script>

<Flexy align="start" justify="start" cubeClass={{ utilClass: 'post__user' }}>
	<Profile src={user.profile} alt={user.username + ' avatar'} />
	<Flexy useColumn={true} gap={'05'}>
		<p>{user.username}</p>
		<Typography fontSize={300}>{user.prestige} prestige</Typography>
	</Flexy>
</Flexy>
