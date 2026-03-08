<script lang="ts">
	import {
		BatteryCharging,
		BatteryFull,
		BatteryLow,
		BatteryMedium,
		BatteryWarning,
		PlugZap,
		WifiIcon
	} from 'lucide-svelte';
	import TopbarItem from './TopbarItem.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
	import { onMount } from 'svelte';

	let { openAppName }: { openAppName?: string } = $props();
	let currentTime = $state('');
	let powerPercentage = $state<number | null>(null);
	let isCharging = $state(false);
	let isDesktop = $state(false);

	setInterval(() => {
		currentTime = new Date().toLocaleTimeString();
	}, 1000);

	onMount(() => {
		if (!('getBattery' in navigator)) {
			isDesktop = true;
			return;
		}
		(navigator as any).getBattery().then((battery: any) => {
			const update = () => {
				powerPercentage = Math.round(battery.level * 100);
				isCharging = battery.charging;
				isDesktop =
					battery.chargingTime === 0 && battery.dischargingTime === Infinity && battery.level === 1;
			};
			update();
			battery.addEventListener('levelchange', update);
			battery.addEventListener('chargingchange', update);
		});
	});
</script>

<TopbarItem classes="left-0">
	<span>{currentTime}</span>
</TopbarItem>
<div class="hidden md:block">
	<TopbarItem classes="left-1/2 -translate-x-1/2">
		<span>
			{#if openAppName}
				{openAppName} -
			{/if}
			Nils Schlegel - Portfolio (in development)
		</span>
	</TopbarItem>
</div>
<TopbarItem classes="right-0 w-22 flex flex-row space-x-2">
	{#if isDesktop}
		<PlugZap />
		<span></span>
	{:else if powerPercentage !== null}
		{#if isCharging}
			<BatteryCharging />
		{:else if powerPercentage > 75}
			<BatteryFull />
		{:else if powerPercentage > 50}
			<BatteryMedium />
		{:else if powerPercentage > 25}
			<BatteryLow />
		{:else}
			<BatteryWarning size={16} />
		{/if}
		<span>{powerPercentage}%</span>
	{/if}
</TopbarItem>

<TopbarItem classes="right-24 w-10 flex flex-row space-x-2">
	<WifiIcon />
</TopbarItem>

<TopbarItem classes="right-36 w-10 flex flex-row space-x-2">
	<ThemeSwitch />
</TopbarItem>
