<script>
	// A drawing "box": four edge lines that draw one at a time
	// (vertical-first or horizontal-first, picked at random) plus a
	// content slot whose text types in once the outline is complete.
	import { typewriter } from './typewriter.js';

	export let label = '';
	export let i = 0; // cascade order on the sheet
	export let cls = ''; // extra classes (padding, margins, etc.)

	// Randomise per box whether the verticals or horizontals are drawn first
	const order = Math.random() < 0.5 ? 'v' : 'h';

	// Timing (ms) mirrors the CSS: body box draws ~1120ms, panels cascade
	// 320ms apart, each panel's four lines take ~680ms. Text types once the
	// panel's outline is finished.
	const boxDone = 1120 + i * 320 + 680;
</script>

<div class="bp-panel {cls}" style="--bp-i: {i}" data-order={order}>
	{#if label}
		<span class="bp-panel-label" use:typewriter={{ done: boxDone - 120, duration: 380 }}>{label}</span>
	{/if}
	<span class="bp-edge e-top" aria-hidden="true"></span>
	<span class="bp-edge e-bottom" aria-hidden="true"></span>
	<span class="bp-edge e-left" aria-hidden="true"></span>
	<span class="bp-edge e-right" aria-hidden="true"></span>
	<div class="bp-box-content" use:typewriter={{ done: boxDone, duration: 1150 }}><slot /></div>
</div>
