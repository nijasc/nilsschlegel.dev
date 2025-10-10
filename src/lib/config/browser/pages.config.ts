import AboutPage from "$lib/components/apps/browser/pages/AboutPage.svelte";
import DownloadsPage from "$lib/components/apps/browser/pages/DownloadsPage.svelte";
import type { Page } from "$lib/type/browser/Page";

export const pages: Page[] = [
    { name: "About", link: "https://about.nilsschlegel.dev", content: AboutPage },
    { name: "Downloads", link: "https://downloads.nilsschlegel.dev", content: DownloadsPage }
]