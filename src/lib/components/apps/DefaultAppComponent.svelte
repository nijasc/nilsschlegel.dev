<script lang="ts">
	import { Minus, X } from 'lucide-svelte';
	import type { DefaultAppProps } from './DefaultAppProps';
	import type { Snippet } from 'svelte';

	let { children, props }: { children: Snippet; props: DefaultAppProps } = $props();
</script>

<div
	class="flex h-full w-full flex-col overflow-hidden rounded-xl border border-base-300 shadow-xl"
>
	<div class="flex shrink-0 items-center justify-between bg-base-200 px-3 py-2">
		<span class="pl-1 text-sm font-medium text-base-content/70">
			{props.application.name}
		</span>
		<div class="flex gap-1">
			<button
				onclick={() => props.onMinimize()}
				class="flex h-6 w-6 items-center justify-center rounded-full bg-warning/20 text-warning transition-colors hover:bg-warning/40"
			>
				<Minus size={13} />
			</button>
			<button
				onclick={() => props.onClose()}
				class="flex h-6 w-6 items-center justify-center rounded-full bg-error/20 text-error transition-colors hover:bg-error/40"
			>
				<X size={13} />
			</button>
		</div>
	</div>
	<div class="min-h-0 flex-1 overflow-y-auto bg-base-100">
		{@render children()}
	</div>
</div>
