import { Theme } from '$lib/type/Theme';

const THEME_KEY = 'theme';
const DEFAULT_THEME = Theme.DARK;
let themeChangeListeners: (() => void)[] = [];

class ThemeStore {
	setTheme(theme: Theme) {
		localStorage.setItem(THEME_KEY, Theme[theme]);
		this.onChange();
	}

	getTheme(): Theme {
		const item = localStorage.getItem(THEME_KEY);
		if (!item) {
			return DEFAULT_THEME;
		}
		if (item === Theme[Theme.LIGHT]) {
			return Theme.LIGHT;
		} else {
			return Theme.DARK;
		}
	}

	subscribe(listener: () => void) {
		themeChangeListeners.push(listener);
	}

	unsubscribe(listener: () => void) {
		themeChangeListeners = themeChangeListeners.filter((l) => l !== listener);
	}

	private onChange() {
		for (const listener of themeChangeListeners) {
			listener();
		}
	}
}

const themeStore = new ThemeStore();

export { themeStore };
