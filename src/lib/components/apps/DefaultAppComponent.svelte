<script lang="ts">
	import { MinusIcon, XIcon } from 'lucide-svelte';
	import type { DefaultAppProps } from './DefaultAppProps';
	import type { Snippet } from 'svelte';

	let { children, props }: { children: Snippet; props: DefaultAppProps } = $props();

	const ACTION_SIZE = 16;
</script>

<div class="h-full w-full rounded-t-lg">
	<div class="flex flex-row justify-between rounded-t-lg bg-base-100 p-2">
		<div class="pl-1">
			<span>{props.application.name}</span>
		</div>
		<div class="flex flex-row space-x-1">
			<button
				onclick={() => props.onMinimize()}
				class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-base-300 text-warning"
			>
				<MinusIcon size={ACTION_SIZE} />
			</button>
			<button
				onclick={() => props.onClose()}
				class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-base-300 text-error"
			>
				<XIcon size={ACTION_SIZE} />
			</button>
		</div>
	</div>
	<div class="h-full bg-base-100/90 rounded-b-lg w-full">
		{@render children()}
	</div>
</div>
