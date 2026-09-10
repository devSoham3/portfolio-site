import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'retro';

// Flood colour the reveal circle paints before data-theme flips. Must match
// each theme's --color-background in app.css (retro :44, blueprint :362).
const THEME_BG = {
	retro: '#050a14',
	blueprint: '#f4f1e8'
};

// Drives ThemeTransition.svelte. null = idle; otherwise the in-flight reveal:
// { x, y, color, next } where x/y is the circle origin (button centre).
export const transition = writable(null);

// Drives CrtBootOn.svelte. Increments each time the retro theme should play
// its power-on reveal (button-triggered switches; first load is handled by
// CrtBootOn itself on mount).
export const crtBoot = writable(0);

function prefersReducedMotion() {
	return browser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function createThemeStore() {
	const initial = browser
		? (localStorage.getItem(STORAGE_KEY) ?? DEFAULT_THEME)
		: DEFAULT_THEME;

	const { subscribe, set } = writable(initial);

	if (browser) {
		document.documentElement.dataset.theme = initial;
	}

	// Apply the switch for real. Called instantly (fallback) or by the overlay
	// once its circle fully covers the viewport.
	function commit(next) {
		document.documentElement.dataset.theme = next;
		localStorage.setItem(STORAGE_KEY, next);
		set(next);
	}

	return {
		subscribe,
		commit,
		/**
		 * Switch themes. With a usable click origin and motion allowed, this kicks
		 * off the circular reveal (overlay commits the theme mid-animation).
		 * Switching to retro floods to black and, once fully covered, hands off
		 * to the CRT power-on reveal instead of fading itself out (see
		 * ThemeTransition.svelte). Otherwise it switches instantly.
		 * @param {MouseEvent} [event] originating click, used for the circle origin
		 */
		toggle(event) {
			if (!browser) return;
			// Ignore re-entrant toggles while a reveal is mid-flight.
			if (get(transition)) return;

			const current = document.documentElement.dataset.theme === 'blueprint' ? 'blueprint' : 'retro';
			const next = current === 'retro' ? 'blueprint' : 'retro';

			if (prefersReducedMotion()) {
				commit(next);
				return;
			}

			const rect = event?.currentTarget?.getBoundingClientRect?.();
			if (!rect) {
				commit(next);
				return;
			}

			transition.set({
				x: rect.left + rect.width / 2,
				y: rect.top + rect.height / 2,
				color: next === 'retro' ? '#000' : THEME_BG[next],
				next
			});
		}
	};
}

export const theme = createThemeStore();
