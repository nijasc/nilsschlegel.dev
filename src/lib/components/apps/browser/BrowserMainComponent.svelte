<script lang="ts">
	import type { Application } from '$lib/type/Application';
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';

	let { props }: { props: DefaultAppProps } = $props();
</script>

<DefaultAppComponent {props}>
	<span>hi</span>
</DefaultAppComponent>
