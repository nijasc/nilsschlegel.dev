<script lang="ts">
	import type { DefaultAppProps } from '$lib/components/apps/DefaultAppProps';
	import Toolbar from '$lib/components/layout/Toolbar.svelte';
	import Topbar from '$lib/components/layout/topbar/Topbar.svelte';
	import type { Application } from '$lib/type/Application';

	let currentApp: Application | null = $state(null);

	let currentProps: DefaultAppProps | null = $state(null);

	function handleAppChange(application: Application | null) {
		if (currentApp?.name === application?.name) {
			handleAppChange(null);
			return;
		}
		currentApp = application;
		if (currentApp) {
			currentProps = {
				application: currentApp,
				onClose: () => handleClose(),
				onMinimize: () => handleMinimize()
			};
		} else {
			currentProps = null;
		}
	}

	function handleClose() {
		handleAppChange(null);
	}

	function handleMinimize() {
		handleAppChange(null);
	}
</script>

<Topbar />

{#if currentApp}
	{@const App = currentApp.component}
	<div class="h-full overflow-y-hidden w-full px-4 pt-12 pb-32">
		<App props={currentProps} />
	</div>
{/if}

<Toolbar onAppChange={(app) => handleAppChange(app)} />
