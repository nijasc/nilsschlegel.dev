<script lang="ts">
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';
	import { createTerminal } from '$lib/impl/terminal';
	import TerminalView from './TerminalView.svelte';

	let { props }: { props: DefaultAppProps } = $props();
	const terminal = createTerminal({
		prefix: '$ visitor@nilsschlegel.dev -> ',
		welcome: ['Welcome!', 'Type `help` to see commands'],
		historyLimit: 300
	});
</script>

<DefaultAppComponent {props}>
	<div class="h-full w-full">
		<TerminalView {terminal} />
	</div>
</DefaultAppComponent>
