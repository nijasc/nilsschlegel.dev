<script>
	import { MoonIcon, SunIcon } from 'lucide-svelte';
	import { themeStore } from '$lib/store/themeStore';
	import { onMount } from 'svelte';
	import { Theme } from '$lib/type/application/Theme';

	let darkMode = $state(true);

	onMount(() => {
		themeStore.subscribe(() => loadIcon());
		loadIcon();
	});

	function loadIcon() {
		if (themeStore.getTheme() == Theme.DARK) {
			darkMode = true;
		} else if (themeStore.getTheme() == Theme.LIGHT) {
			darkMode = false;
		}
	}

	function handleToggle() {
		if (darkMode) {
			themeStore.setTheme(Theme.LIGHT);
		} else {
			themeStore.setTheme(Theme.DARK);
		}
	}
</script>

<button class="cursor-pointer" onclick={() => handleToggle()}>
	{#if darkMode}
		<MoonIcon />
	{:else}
		<SunIcon />
	{/if}
</button>
