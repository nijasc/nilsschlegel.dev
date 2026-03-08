import type { Application } from '$lib/type/application/Application';
import type { Snippet } from 'svelte';

export interface DefaultAppProps {
	application: Application;
	onMinimize: () => void;
	onClose: () => void;
}
