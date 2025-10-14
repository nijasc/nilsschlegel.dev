<script lang="ts">
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';
	import { createTerminal } from '$lib/impl/terminal';
	import TerminalView from './TerminalView.svelte';

	const nilsAscii =
		' _______  .__.__          \n' +
		' \\      \\ |__|  |   ______ \n' +
		' /   |   \\|  |  |  /  ___/ \n' +
		'/    |    \\  |  |__\\___ \\  \n' +
		'\\____|__  /__|____/____  > \n' +
		'        \\/             \\/ ';

	let { props }: { props: DefaultAppProps } = $props();
	const terminal = createTerminal({
		prefix: '$ visitor@nilsschlegel.dev -> ',
		welcome: [nilsAscii, 'Type `help` to see commands - me@nilsschlegel.dev'],
		historyLimit: 300,
		projects: [],
		skills: []
	});
</script>

<DefaultAppComponent {props}>
	<div class="h-full w-full">
		<TerminalView {terminal} />
	</div>
</DefaultAppComponent>
