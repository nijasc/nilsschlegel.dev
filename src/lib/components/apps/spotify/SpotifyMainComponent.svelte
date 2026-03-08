<script lang="ts">
	import type { SpotifyStats } from '$lib/type/spotify/SpotifyStats';
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';
	import History from './impl/History.svelte';
	import NowPlaying from './impl/NowPlaying.svelte';
	import Playlists from './impl/Playlists.svelte';

	let { props }: { props: DefaultAppProps } = $props();

	let stats: SpotifyStats | null = $state(null);
	let loading = $state(true);
	let error = $state(false);

	$effect(() => {
		fetch('/api/spotify')
			.then((r) => r.json())
			.then((data) => {
				stats = data;
				loading = false;
			})
			.catch(() => {
				error = true;
				loading = false;
			});
	});
</script>

<DefaultAppComponent {props}>
	<div class="flex w-full flex-col gap-3 p-4">
		{#if loading}
			<div class="flex flex-col gap-3">
				<div class="h-24 w-full skeleton rounded-2xl"></div>
				<div class="h-64 w-full skeleton rounded-2xl"></div>
				<div class="h-64 w-full skeleton rounded-2xl"></div>
			</div>
		{:else if error}
			<div class="alert alert-error text-sm">Failed to load Spotify data.</div>
		{:else if stats}
			<NowPlaying track={stats.nowPlaying} isPlaying={stats.isPlaying} />
			{#if stats.history.length}
				<History items={stats.history} />
			{/if}
			{#if stats.playlists.length}
				<Playlists items={stats.playlists} />
			{/if}
		{/if}
	</div>
</DefaultAppComponent>
