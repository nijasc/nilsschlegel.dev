<script lang="ts">
	import { themeStore } from '$lib/store/themeStore';
	import { onMount } from 'svelte';
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';
	import { Theme } from '$lib/type/Theme';

	let darkMode = $state(false);

	let { props }: { props: DefaultAppProps } = $props();

	onMount(() => {
		loadState();
	});

	themeStore.subscribe(() => {
		loadState();
	});

	function loadState() {
		if (themeStore.getTheme() == Theme.DARK) {
			darkMode = true;
		} else {
			darkMode = false
		}
	}

	function toggle() {
		if (themeStore.getTheme() == Theme.DARK) {
			themeStore.setTheme(Theme.LIGHT);
		} else {
			themeStore.setTheme(Theme.DARK);
		}
	}
</script>

<DefaultAppComponent {props}>
	<div class="flex flex-col p-16">
		<span class="text-2xl">System Settings</span>
		<label>
			<span>Dark Mode</span>
			<input checked={darkMode} onclick={() => toggle()} class="checkbox" type="checkbox" />
		</label>
	</div>
</DefaultAppComponent>
