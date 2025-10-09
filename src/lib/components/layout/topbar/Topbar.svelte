<script lang="ts">
	import TopbarItem from './TopbarItem.svelte';

	let currentTime = $state('');

	setInterval(() => {
		var date = new Date();
		currentTime = date.toLocaleTimeString();
	}, 1000);
</script>

<TopbarItem classes="">
	<span>{currentTime}</span>
</TopbarItem>
<TopbarItem classes="left-1/2 -translate-x-1/2">
	<span>Nils Schlegel - Portfolio (in development)</span>
</TopbarItem>
