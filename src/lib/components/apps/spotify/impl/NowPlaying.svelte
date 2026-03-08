<script lang="ts">
	import type { TrackInfo } from '$lib/type/spotify/TrackInfo';
	import { Music2 } from 'lucide-svelte';

	let { track, isPlaying }: { track: TrackInfo | undefined; isPlaying: boolean } = $props();
</script>

<div class="card w-full bg-base-200">
	<div class="card-body p-4">
		{#if track}
			<a href={track.url} target="_blank" rel="noreferrer" class="group flex items-center gap-4">
				<div class="relative shrink-0">
					<img src={track.image} alt={track.name} class="h-16 w-16 rounded-lg object-cover" />
					{#if isPlaying}
						<span class="absolute -top-1 -right-1 flex h-3 w-3">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"
							></span>
							<span class="relative inline-flex h-3 w-3 rounded-full bg-success"></span>
						</span>
					{/if}
				</div>
				<div class="overflow-hidden">
					<p class="mb-1 text-xs text-base-content/50">
						{isPlaying ? 'Now Playing' : 'Last Played'}
					</p>
					<p class="truncate font-semibold group-hover:underline">{track.name}</p>
					<p class="truncate text-sm text-base-content/60">{track.artist}</p>
				</div>
			</a>
		{:else}
			<div class="flex items-center gap-3 text-base-content/40">
				<Music2 size={20} />
				<span class="text-sm">Not playing anything</span>
			</div>
		{/if}
	</div>
</div>
