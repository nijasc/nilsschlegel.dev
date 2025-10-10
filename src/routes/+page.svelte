<script lang="ts">
	import type { DefaultAppProps } from '$lib/components/apps/DefaultAppProps';
	import Toolbar from '$lib/components/layout/Toolbar.svelte';
	import Topbar from '$lib/components/layout/topbar/Topbar.svelte';
	import type { Application } from '$lib/type/Application';

	let currentApp: Application | null = $state(null);

	let currentProps: DefaultAppProps | null = $state(null);

	function handleAppchange(application: Application | null) {
		if (currentApp?.name === application?.name) {
			handleAppchange(null);
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
		handleAppchange(null);
	}

	function handleMinimize() {
		handleAppchange(null);
	}
</script>

<Topbar />

{#if currentApp}
	{@const App = currentApp.component}
	<div class="h-full overflow-y-hidden w-full px-4 pt-12 pb-20">
		<App props={currentProps} />
	</div>
{/if}

<Toolbar onAppChange={(app) => handleAppchange(app)} />
