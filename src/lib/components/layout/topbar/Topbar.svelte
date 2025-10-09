<script lang="ts">
	import { BatteryCharging, BatteryFull, WifiIcon } from 'lucide-svelte';
	import TopbarItem from './TopbarItem.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let currentTime = $state('');

	setInterval(() => {
		var date = new Date();
		currentTime = date.toLocaleTimeString();
	}, 1000);
</script>

<TopbarItem classes="left-0">
	<span>{currentTime}</span>
</TopbarItem>
<TopbarItem classes="left-1/2 -translate-x-1/2">
	<span>Nils Schlegel - Portfolio (in development)</span>
</TopbarItem>
<TopbarItem classes="right-0 w-22 flex flex-row space-x-2">
	<BatteryFull />
	<span>100%</span>
</TopbarItem>

<TopbarItem classes="right-24 w-10 flex flex-row space-x-2">
	<WifiIcon />
</TopbarItem>

<TopbarItem classes="right-36 w-10 flex flex-row space-x-2">
	<ThemeSwitch />
</TopbarItem>
