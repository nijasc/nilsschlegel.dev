<script lang="ts">
	import { pages } from '$lib/config/browser/pages.config';
	import type { Page } from '$lib/type/browser/Page';
	import { ArrowLeft, ArrowRight, RefreshCw, Search } from 'lucide-svelte';
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';

	let { props }: { props: DefaultAppProps } = $props();

	let currentPage: Page | null = $state(null);
	let pageHistory: Page[] = $state([]);
	let historyIndex: number = $state(-1);
	let searchInput: string = $state('');
	let forwardEnabled: boolean = $state(false);
	let backEnabled: boolean = $state(false);
	let notFound: { active: boolean; text: string } = $state({ active: false, text: '' });

	function handleTabChange(page: Page | null) {
		if (!page) {
			currentPage = null;
			return;
		}
		if (historyIndex < pageHistory.length - 1) {
			pageHistory = pageHistory.slice(0, historyIndex + 1);
		}
		pageHistory.push(page);
		historyIndex = pageHistory.length - 1;
		currentPage = pageHistory[historyIndex] ?? null;
	}

	function handleForward() {
		if (!forwardEnabled) return;
		historyIndex += 1;
		currentPage = pageHistory[historyIndex] ?? null;
	}

	function handleBack() {
		if (!backEnabled) return;
		historyIndex -= 1;
		currentPage = pageHistory[historyIndex] ?? null;
	}

	function handleSearch() {
		if (searchInput === '') {
			handleTabChange(null);
			notFound = { active: false, text: '' };
			return;
		}
		const match = pages.find(
			(p) =>
				p.link.toLocaleLowerCase() === searchInput.toLocaleLowerCase() ||
				p.name.toLocaleLowerCase() === searchInput.toLocaleLowerCase()
		);
		if (match) {
			notFound = { active: false, text: '' };
			handleTabChange(match);
		} else {
			notFound = { active: true, text: searchInput };
			handleTabChange(null);
		}
	}

	function handleReload() {
		const last = currentPage;
		currentPage = null;
		currentPage = last;
	}

	$effect(() => {
		backEnabled = historyIndex > 0;
		forwardEnabled = historyIndex < pageHistory.length - 1;
		if (currentPage) searchInput = currentPage.link;
	});
</script>

<DefaultAppComponent {props}>
	<div class="flex h-full w-full flex-col">
		<div class="shrink-0 border-b border-base-300 bg-base-200 px-3 py-2">
			<div class="flex items-center gap-2">
				<div class="flex gap-1">
					<button
						disabled={!backEnabled}
						onclick={handleBack}
						class="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-base-300 disabled:opacity-30"
						aria-label="Back"
					>
						<ArrowLeft size={14} />
					</button>
					<button
						disabled={!forwardEnabled}
						onclick={handleForward}
						class="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-base-300 disabled:opacity-30"
						aria-label="Forward"
					>
						<ArrowRight size={14} />
					</button>
					<button
						onclick={handleReload}
						class="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:bg-base-300"
						aria-label="Reload"
					>
						<RefreshCw size={14} />
					</button>
				</div>

				<div class="relative flex flex-1 items-center">
					<Search size={13} class="absolute left-2.5 text-base-content/40" />
					<input
						type="text"
						bind:value={searchInput}
						onkeydown={(e) => e.key === 'Enter' && handleSearch()}
						placeholder="Search or enter address"
						class="input input-sm w-full rounded-lg border border-base-300 bg-base-100 pl-8 text-sm focus:border-primary focus:outline-none"
					/>
				</div>

				<button onclick={handleSearch} class="btn rounded-lg btn-sm btn-primary">Go</button>
			</div>
		</div>

		<div class="shrink-0 border-b border-base-300 bg-base-200/60 px-3">
			<div class="flex gap-1 overflow-x-auto py-1.5">
				{#each pages as page (page.link)}
					<button
						onclick={() => handleTabChange(page)}
						class="rounded-md px-3 py-1 text-sm whitespace-nowrap transition-colors
							{currentPage?.link === page.link
							? 'bg-base-100 font-medium text-base-content shadow-sm'
							: 'text-base-content/50 hover:bg-base-300 hover:text-base-content'}"
					>
						{page.name}
					</button>
				{/each}
			</div>
		</div>

		<div class="min-h-0 flex-1 overflow-auto">
			{#if currentPage}
				{@const Content = currentPage.content}
				<div class="p-6">
					<Content />
				</div>
			{:else if notFound.active}
				<div
					class="flex h-full min-h-64 flex-col items-center justify-center gap-2 p-8 text-center"
				>
					<p class="text-lg font-semibold text-base-content">Page not found</p>
					<p class="text-sm text-base-content/50">
						No page matching <span class="font-medium text-base-content/70">"{notFound.text}"</span>
						— try a tab above or enter a valid address.
					</p>
				</div>
			{:else}
				<div
					class="flex h-full min-h-64 flex-col items-center justify-center gap-2 p-8 text-center"
				>
					<p class="text-lg font-semibold text-base-content">Welcome</p>
					<p class="text-sm text-base-content/50">Select a tab above to get started.</p>
				</div>
			{/if}
		</div>
	</div>
</DefaultAppComponent>
