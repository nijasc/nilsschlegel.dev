<script lang="ts">
	import type { PlaylistInfo } from '$lib/type/spotify/PlaylistInfo';
	import { ListMusic } from 'lucide-svelte';

	let { items }: { items: PlaylistInfo[] } = $props();
</script>

<div class="card w-full bg-base-200">
	<div class="card-body p-4">
		<div class="mb-3 flex items-center gap-2">
			<ListMusic size={14} class="text-base-content/50" />
			<h3 class="text-xs font-medium tracking-wider text-base-content/50 uppercase">Playlists</h3>
		</div>
		<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
			{#each items as playlist}
				<a href={playlist.url} target="_blank" rel="noreferrer" class="group flex flex-col gap-2">
					{#if playlist.image}
						<img
							src={playlist.image}
							alt={playlist.name}
							class="aspect-square w-full rounded-lg object-cover"
						/>
					{:else}
						<div
							class="flex aspect-square w-full items-center justify-center rounded-lg bg-base-300"
						>
							<ListMusic size={24} class="text-base-content/20" />
						</div>
					{/if}
					<div>
						<p class="truncate text-sm font-medium group-hover:underline">{playlist.name}</p>
						<p class="text-xs text-base-content/50">{playlist.tracks} tracks</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
