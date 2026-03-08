<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import manifest from '$lib/config/manifest.json';

	import backgroundLight from '$lib/assets/background-light.jpg';
	import backgroundDark from '$lib/assets/background-dark.jpg';

	import { themeStore } from '$lib/store/themeStore';
	import { onMount } from 'svelte';
	import { Theme } from '$lib/type/application/Theme';

	const LIGHT_CLASS = 'corporate';
	const DARK_CLASS = 'business';

	let background = $state();

	onMount(() => {
		themeStore.subscribe(() => applyTheme());
		applyTheme();
	});

	function applyTheme() {
		if (themeStore.getTheme() == Theme.LIGHT) {
			background = backgroundLight;
			document.documentElement.setAttribute('data-theme', LIGHT_CLASS);
		} else {
			background = backgroundDark;
			document.documentElement.setAttribute('data-theme', DARK_CLASS);
		}
	}

	let { children } = $props();
</script>

<svelte:head>
	<title>Nils Schlegel - Portfolio</title>
	<meta name="title" content="Nils Schlegel - Portfolio" />
	<meta
		name="description"
		content="Explore a ArchLinux Desktop themed portfolio. Fully designed and implemented by Nils Schlegel using SvelteKit. The whole experience is open source, so you can see my code!"
	/>
	<meta
		name="keywords"
		content="portfolio, nils schlegel, nils, schlegel, arch, arch linux, desktop"
	/>
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="author" content="Nils Schlegel" />
	<meta name="apple-mobile-web-app-capable" content="yes" />

	<link rel="manifest" href={manifest} />
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

<div
	class="h-screen w-screen overflow-hidden bg-cover bg-center"
	style="background-image: url('{background}')"
>
	{@render children?.()}
</div>
