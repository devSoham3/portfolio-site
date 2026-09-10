<script>
	import { onMount } from 'svelte';
	import { crtBoot } from '$lib/stores/theme.js';

	let play = false;

	function reducedMotion() {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	function fire() {
		if (reducedMotion()) return;
		play = true;
	}

	onMount(() => {
		if (document.documentElement.dataset.theme === 'retro') fire();
	});

	// Re-fires on every button-triggered switch into retro (see theme.js).
	// $crtBoot starts at 0, so this stays inert until the first real trigger.
	$: if ($crtBoot) fire();
</script>

{#if play}
	<div class="crt-boot" aria-hidden="true">
		<div class="crt-bar crt-bar-top"></div>
		<div class="crt-bar crt-bar-bottom" on:animationend={() => (play = false)}></div>
		<div class="crt-line"></div>
	</div>
{/if}

<style>
	.crt-boot {
		position: fixed;
		inset: 0;
		z-index: 10000;
		pointer-events: none;
		overflow: hidden;
	}

	/* Two black leaves covering the full screen at rest (pitch black), each
	   sliding off its own edge to "open" the picture from the centre out. */
	.crt-bar {
		position: absolute;
		left: 0;
		right: 0;
		height: 50%;
		background: #000;
	}
	.crt-bar-top {
		top: 0;
		animation: crtBarTop 650ms cubic-bezier(0.5, 0, 0.75, 0.2) forwards;
	}
	.crt-bar-bottom {
		bottom: 0;
		animation: crtBarBottom 650ms cubic-bezier(0.5, 0, 0.75, 0.2) forwards;
	}
	@keyframes crtBarTop {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-100%);
		}
	}
	@keyframes crtBarBottom {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}

	/* Bright seam at the opening gap, like a CRT tube's first scan line. */
	.crt-line {
		position: absolute;
		left: 0;
		right: 0;
		top: 50%;
		height: 3px;
		transform: translateY(-50%);
		background: #dffbff;
		box-shadow: 0 0 30px 8px rgba(19, 182, 236, 0.9);
		animation: crtLineFade 650ms ease-in forwards;
	}
	@keyframes crtLineFade {
		0% {
			opacity: 1;
		}
		55% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
