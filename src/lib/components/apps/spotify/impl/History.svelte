<script lang="ts">
	import type { HistoryItem } from '$lib/type/spotify/HistoryItem';
	import { Clock } from 'lucide-svelte';

	let { items }: { items: HistoryItem[] } = $props();

	function relativeTime(dateStr: string) {
		const diff = (new Date(dateStr).getTime() - Date.now()) / 1000;
		const abs = Math.abs(diff);
		if (abs < 60) return 'just now';
		if (abs < 3600) return `${Math.floor(abs / 60)}m ago`;
		if (abs < 86400) return `${Math.floor(abs / 3600)}h ago`;
		return `${Math.floor(abs / 86400)}d ago`;
	}
</script>

<div class="card w-full bg-base-200">
	<div class="card-body p-4">
		<div class="mb-3 flex items-center gap-2">
			<Clock size={14} class="text-base-content/50" />
			<h3 class="text-xs font-medium tracking-wider text-base-content/50 uppercase">
				Recently Played
			</h3>
		</div>
		<ul class="space-y-3">
			{#each items as item}
				<li>
					<a href={item.url} target="_blank" rel="noreferrer" class="group flex items-center gap-3">
						<img src={item.image} alt={item.name} class="h-9 w-9 shrink-0 rounded object-cover" />
						<div class="min-w-0 flex-1 overflow-hidden">
							<p class="truncate text-sm font-medium group-hover:underline">{item.name}</p>
							<p class="truncate text-xs text-base-content/50">{item.artist}</p>
						</div>
						<span class="shrink-0 text-xs text-base-content/30">{relativeTime(item.playedAt)}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>
