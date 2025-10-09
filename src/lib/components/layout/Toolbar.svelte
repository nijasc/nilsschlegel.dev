<script lang="ts">
	import { apps } from '$lib/config/apps.config';
	import type { Application } from '$lib/type/Application';
	import { TerminalIcon } from 'lucide-svelte';

	function handleAppOpen(app: Application) {}
</script>

<div
	class="fixed bottom-0 left-1/2 flex -translate-x-1/2 flex-row space-x-2 rounded-t-xl bg-base-200/70 p-2"
>
	{#each apps as app (app.name)}
		<button
			onclick={() => handleAppOpen(app)}
			class="tooltip cursor-pointer rounded-xl bg-primary p-4"
			data-tip={app.name}
		>
			{#if true}
				{@const Icon = app.icon}
				<Icon />
			{/if}
		</button>
	{/each}
</div>
