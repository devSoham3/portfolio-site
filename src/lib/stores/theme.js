import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'retro';

function createThemeStore() {
	const initial = browser
		? (localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME)
		: DEFAULT_THEME;

	const { subscribe, set } = writable(initial);

	if (browser) {
		document.documentElement.dataset.theme = initial;
	}

	return {
		subscribe,
		toggle() {
			const next = document.documentElement.dataset.theme === 'retro' ? 'blueprint' : 'retro';
			document.documentElement.dataset.theme = next;
			localStorage.setItem(STORAGE_KEY, next);
			set(next);
		}
	};
}

export const theme = createThemeStore();
