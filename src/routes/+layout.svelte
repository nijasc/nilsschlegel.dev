<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import backgroundLight from '$lib/assets/background-light.jpg';
	import backgroundDark from '$lib/assets/background-dark.jpg';

	import { themeStore } from '$lib/store/themeStore';
	import { onMount } from 'svelte';
	import { Theme } from '$lib/type/Theme';

	let background = $state();

	onMount(() => {
		themeStore.subscribe(() => applyTheme());
		applyTheme();
	});

	function applyTheme() {
		if (themeStore.getTheme() == Theme.LIGHT) {
			background = backgroundLight;
		} else {
			background = backgroundDark;
		}
	}

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="h-screen w-screen overflow-hidden bg-cover bg-center"
	style="background-image: url('{background}')"
>
	{@render children?.()}
</div>
