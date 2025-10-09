<script lang="ts">
	import { apps } from '$lib/config/apps.config';
	import type { Application } from '$lib/type/Application';

	let { onAppChange }: { onAppChange: (app: Application | null) => void } = $props();

	function handleAppOpen(app: Application) {
		onAppChange(app);
	}
</script>

<div
	class="fixed bottom-0 left-1/2 flex -translate-x-1/2 flex-row space-x-2 rounded-t-xl bg-base-200/70 p-2"
>
	{#each apps as application (application.name)}
		<button
			onclick={() => handleAppOpen(application)}
			class="tooltip cursor-pointer rounded-xl bg-primary p-4"
			data-tip={application.name}
		>
			{#if true}
				{@const Icon = application.icon}
				<Icon />
			{/if}
		</button>
	{/each}
</div>
