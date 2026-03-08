import BrowserMainComponent from '$lib/components/apps/browser/BrowserMainComponent.svelte';
import SettingsMainComponent from '$lib/components/apps/settings/SettingsMainComponent.svelte';
import SpotifyMainComponent from '$lib/components/apps/spotify/SpotifyMainComponent.svelte';
import TerminalMainComponent from '$lib/components/apps/terminal/TerminalMainComponent.svelte';
import type { Application } from '$lib/type/application/Application';
import { ChromeIcon, MusicIcon, SettingsIcon, TerminalIcon } from 'lucide-svelte';

export const apps: Application[] = [
	{ name: 'Browser', component: BrowserMainComponent, icon: ChromeIcon },
	{ name: 'Spotify', component: SpotifyMainComponent, icon: MusicIcon },
	{ name: 'Terminal', component: TerminalMainComponent, icon: TerminalIcon },
	{ name: 'Settings', component: SettingsMainComponent, icon: SettingsIcon }
];
