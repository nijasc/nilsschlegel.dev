<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	interface TopBarProps {
		classes: string;
		children: Snippet;
	}

	let { classes, children }: TopBarProps = $props();
</script>

<div class="fixed top-0 rounded-b-xl bg-base-200/70 p-2 {classes}">
	{@render children()}
</div>
