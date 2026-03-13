<script lang="ts">
	import { pages } from '$lib/config/browser/pages.config';
	import type { Page } from '$lib/type/browser/Page';
	import { ArrowLeft, ArrowRight, RefreshCwIcon } from 'lucide-svelte';
	import DefaultAppComponent from '../DefaultAppComponent.svelte';
	import type { DefaultAppProps } from '../DefaultAppProps';

	let { props }: { props: DefaultAppProps } = $props();

	let currentPage: Page | null = $state(null);
	let pageHistory: Page[] = $state([]);
	let historyIndex: number = $state(-1);
	let searchInput: string = $state('');
	let forwardEnabled: boolean = $state(false);
	let notFound: { active: boolean; text: string } = $state({ active: false, text: '' });
	let backEnabled: boolean = $state(false);

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
		if (forwardEnabled) {
			historyIndex += 1;
			currentPage = pageHistory[historyIndex] ?? null;
		}
	}

	function handleBack() {
		if (backEnabled) {
			historyIndex -= 1;
			currentPage = pageHistory[historyIndex] ?? null;
		}
	}

	function handleSearch() {
		for (const page of pages) {
			notFound = { active: false, text: `` };
			if (
				page.link.toLocaleLowerCase() === searchInput.toLocaleLowerCase() ||
				page.name.toLocaleLowerCase() === searchInput.toLocaleLowerCase()
			) {
				handleTabChange(page);
				return;
			} else if (searchInput === '') {
				handleTabChange(null);
			} else {
				notFound = { active: true, text: `Could not find ${searchInput}` };
				handleTabChange(null);
			}
		}
	}

	function handleReload() {
		const lastPage = currentPage;
		currentPage = null;
		currentPage = lastPage;
	}

	function hasForward() {
		forwardEnabled = historyIndex < pageHistory.length - 1;
	}

	function hasBack() {
		backEnabled = historyIndex > 0;
	}

	$effect(() => {
		hasBack();
		hasForward();
		if (currentPage) {
			searchInput = currentPage?.link;
		}
	});
</script>

<DefaultAppComponent {props}>
	<div class="flex h-full w-full flex-col">
		<div class="sticky top-10 z-30 border-b border-base-300 bg-base-100/95 px-3 py-2 backdrop-blur">
			<div class="flex items-center gap-2">
				<div class="join">
					<button
						disabled={!backEnabled}
						onclick={() => handleBack()}
						class="btn join-item btn-sm"
						aria-label="Back"
					>
						<ArrowLeft size="12" />
					</button>
					<button
						disabled={!forwardEnabled}
						onclick={() => handleForward()}
						class="btn join-item btn-sm"
						aria-label="Forward"
					>
						<ArrowRight size="12" />
					</button>
					<button onclick={() => handleReload()} class="btn join-item btn-sm" aria-label="Refresh">
						<RefreshCwIcon size="12" />
					</button>
				</div>
				<input
					class="input input-sm w-full border focus:border-primary focus:outline-none"
					type="text"
					onkeydown={(event) => {
						if (event.key === 'Enter') {
							handleSearch();
						}
					}}
					bind:value={searchInput}
					placeholder="Search or enter address"
				/>
				<button onclick={() => handleSearch()} class="btn btn-sm btn-primary">Go</button>
			</div>
		</div>

		<div
			class="sticky top-[calc(2.5rem+2.5rem)] z-20 border-b border-base-300 bg-base-100/95 px-3 py-2 backdrop-blur"
		>
			<div class="tabs-boxed tabs w-full overflow-x-auto">
				{#each pages as page (page.link)}
					<button
						class="tab whitespace-nowrap"
						class:tab-active={currentPage?.link === page.link}
						onclick={() => handleTabChange(page)}
						title={page.name}
					>
						{page.name}
					</button>
				{/each}
			</div>
		</div>

		<div class="min-h-0 flex-1 overflow-auto">
			<div class="p-4">
				{#if currentPage}
					{@const Content = currentPage.content}

					<div class="mt-8">
						<Content />
					</div>
				{:else if notFound.active}
					<div class="prose max-w-none text-base-content/70">
						<h3>Not Found!</h3>
						<p>Could not find page {notFound.text}, try the following options:</p>
						<ul>
							<li>Click a tab from above</li>
							<li>Enter the name or address of a page and try again</li>
						</ul>
					</div>
				{:else}
					<div class="flex h-64 w-full items-center justify-center text-center">
						<div class="prose max-w-none text-base-content/70">
							<h3>Welcome</h3>
							<p>Select a tab above to view its content.</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</DefaultAppComponent>
