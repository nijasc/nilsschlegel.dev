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
<TopbarItem classes="right-0">
	<span>Hello</span>
</TopbarItem>
