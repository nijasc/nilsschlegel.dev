<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import background from '$lib/assets/background.png';
	import Topbar from '$lib/components/layout/topbar/Topbar.svelte';
	import Toolbar from '$lib/components/layout/Toolbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div
	class="h-screen w-screen overflow-hidden bg-cover bg-center"
	style="background-image: url('{background}')"
>
	<Topbar />
	{@render children?.()}
	<Toolbar />
</div>
