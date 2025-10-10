<script lang="ts">
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';

	let { props }: { props: DefaultAppProps } = $props();
</script>

<DefaultAppComponent {props}>
	<span>{props.application.name}</span>
</DefaultAppComponent>
