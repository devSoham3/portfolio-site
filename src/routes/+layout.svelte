<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import ThemeTransition from '$lib/ThemeTransition.svelte';
	import CrtBootOn from '$lib/CrtBootOn.svelte';

	let { children } = $props();

	// Apply stored theme immediately to avoid flash on load
	if (browser) {
		const saved = localStorage.getItem('portfolio-theme') ?? 'retro';
		document.documentElement.dataset.theme = saved;
	}
</script>

{@render children()}
<ThemeTransition />
<CrtBootOn />
