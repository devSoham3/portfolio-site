<script>
	import { tick } from 'svelte';
	import { theme, transition, crtBoot } from '$lib/stores/theme.js';

	const GROW_MS = 550; // circle expansion
	const FADE_MS = 220; // overlay fade-out after the theme is committed

	// Overlay geometry for the active reveal, or null when idle.
	let active = null;
	// Drives the clip-path radius: false = collapsed at origin, true = full cover.
	let grown = false;
	// Fades the overlay out once the new theme is live underneath.
	let fading = false;

	// Kick off a reveal whenever the store publishes one.
	$: if ($transition && !active) start($transition);

	async function start(t) {
		active = t;
		grown = false;
		fading = false;

		// Render the collapsed circle first, then grow on the next frame so the
		// browser registers the radius change as a transition.
		await tick();
		requestAnimationFrame(() =>
			requestAnimationFrame(() => {
				grown = true;
			})
		);

		// Commit the theme under cover of the fully-grown circle.
		setTimeout(() => {
			theme.commit(t.next);

			if (t.next === 'retro') {
				// Hand off to the CRT power-on reveal instead of fading this
				// overlay out — both are solid black at this instant, so
				// dropping this one as that one appears is seamless.
				crtBoot.update((n) => n + 1);
				finish();
				return;
			}

			fading = true;
			setTimeout(finish, FADE_MS);
		}, GROW_MS);
	}

	function finish() {
		active = null;
		grown = false;
		fading = false;
		transition.set(null);
	}

	// Radius that reaches the farthest viewport corner from the origin.
	function maxRadius(x, y) {
		const w = window.innerWidth;
		const h = window.innerHeight;
		return Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
	}
</script>

{#if active}
	<div
		class="theme-reveal"
		class:fading
		style="
			background: {active.color};
			clip-path: circle({grown ? maxRadius(active.x, active.y) : 0}px at {active.x}px {active.y}px);
			transition: clip-path {GROW_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity {FADE_MS}ms linear;
		"
		aria-hidden="true"
	></div>
{/if}

<style>
	.theme-reveal {
		position: fixed;
		inset: 0;
		z-index: 9999;
		pointer-events: none;
		opacity: 1;
		will-change: clip-path, opacity;
	}
	.theme-reveal.fading {
		opacity: 0;
	}
</style>
