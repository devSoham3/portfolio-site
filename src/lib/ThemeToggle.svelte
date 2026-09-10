<script>
	import { theme } from '$lib/stores/theme.js';
</script>

<!-- Shown in the retro theme; styled like the engineering blueprint theme it
     switches to (off-white paper, black ink, monospace, sharp corners). -->
<button
	on:click={(e) => theme.toggle(e)}
	title="Switch to engineering blueprint theme"
	class="blueprint-toggle"
>
	<span class="material-symbols-outlined" style="font-size: 16px;">architecture</span>
	<span class="toggle-label">BLUEPRINT</span>
</button>

<style>
	.blueprint-toggle {
		position: relative;
		overflow: hidden;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		height: 40px;
		box-sizing: border-box;
		background: #f4f1e8;
		color: #111111;
		border: 1.5px solid #111111;
		border-radius: 4px;
		font-family: 'Courier New', monospace;
		font-weight: 700;
		font-size: 14px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		padding: 0 24px;
		cursor: pointer;
		transition: background 0.2s;
	}
	/* Cream background stays put; only the diagonal hatch (same pattern as the
	   blueprint theme's active tabs) wipes in from the left on hover. Text
	   stays solid black the whole time — plain ink, like everywhere else in
	   the theme — instead of the white-fill/black-outline trick, which read
	   as harder to parse than just black-on-paper. */
	.blueprint-toggle::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: repeating-linear-gradient(
			45deg,
			#111111 0,
			#111111 1px,
			transparent 1px,
			transparent 5px
		);
		opacity: 0.55;
		clip-path: inset(0 100% 0 0);
		transition: clip-path 0.35s ease-out;
		pointer-events: none;
		z-index: 0;
	}
	.blueprint-toggle:hover::before {
		clip-path: inset(0 0 0 0);
	}
	.blueprint-toggle > :global(span) {
		position: relative;
		z-index: 1;
	}
	/* Faux-bold on hover: a same-colour shadow thickens the strokes so the
	   label stays readable over the hatch, without flipping to a white fill. */
	.blueprint-toggle:hover .toggle-label {
		font-weight: 900;
		font-size: 15px;
		text-shadow:
			-0.4px -0.4px 0 #111111, 0.4px -0.4px 0 #111111,
			-0.4px 0.4px 0 #111111, 0.4px 0.4px 0 #111111;
	}
	@media (max-width: 639px) {
		.blueprint-toggle {
			width: 40px;
			padding: 0;
		}
		.toggle-label {
			display: none;
		}
	}
</style>
