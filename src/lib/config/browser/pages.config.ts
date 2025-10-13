import AboutPage from '$lib/components/apps/browser/pages/AboutPage.svelte';
import DownloadsPage from '$lib/components/apps/browser/pages/DownloadsPage.svelte';
import SourceCodePage from '$lib/components/apps/browser/pages/SourceCodePage.svelte';
import SecretPage from '$lib/components/apps/browser/pages/SecretPage.svelte';
import type { Page } from '$lib/type/browser/Page';

export const pages: Page[] = [
	{ name: 'About', link: 'https://about.nilsschlegel.dev', content: AboutPage },
	{ name: 'Downloads', link: 'https://downloads.nilsschlegel.dev', content: DownloadsPage },
	{
		name: 'SourceCode',
		link: 'https://github.com/nijasc/nilsschlegel.dev',
		content: SourceCodePage
	},
	{
		name: 'Secret',
		link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1',
		content: SecretPage
	}
];
