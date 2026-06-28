<script>
	import { theme } from '$lib/stores/theme.js';
</script>

<!-- Shown in the retro theme; styled like the engineering blueprint theme it
     switches to (off-white paper, black ink, monospace, sharp corners). -->
<button
	on:click={theme.toggle}
	title="Switch to engineering blueprint theme"
	class="blueprint-toggle"
>
	<span class="material-symbols-outlined" style="font-size: 16px;">architecture</span>
	BLUEPRINT
</button>

<style>
	.blueprint-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		background: #f4f1e8;
		color: #111111;
		border: 2px solid #111111;
		border-radius: 0;
		font-family: 'Courier New', monospace;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 7px 12px;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}
	.blueprint-toggle:hover {
		background: #111111;
		color: #f4f1e8;
	}
</style>
