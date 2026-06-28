<script>
	import { onMount } from 'svelte';
	import BpBox from './BpBox.svelte';
	import { typewriter } from './typewriter.js';
	import { drawEdges } from './drawEdges.js';
	let aboutData = null;
	let error = null;

	onMount(async () => {
		try {
			const res = await fetch('/data/about.json');
			aboutData = await res.json();
		} catch (err) {
			error = err;
		}
	});
</script>

<section class="bp-root">
	{#if error}
		<p style="color: var(--bp-red);">// DRAWING DATA NOT FOUND — REF about.json</p>
	{:else if aboutData}
		<!-- Sheet heading -->
		<div class="bp-sheet-head" use:typewriter={{ done: 1260, duration: 700 }}>
			<div>
				<h1 class="bp-title text-2xl md:text-3xl">About</h1>
				<p class="mt-1 text-xs" style="color: var(--bp-ink);">
					SHEET 01 — SUBJECT: {aboutData.name.toUpperCase()}
				</p>
			</div>
			<p class="hidden text-right text-[10px] md:block" style="color: var(--bp-ink);">
				PROJECTION: FIRST ANGLE<br />UNITS: mm
			</p>
		</div>

		<div class="grid grid-cols-1 gap-10 lg:grid-cols-[300px_1fr]">
			<!-- Orthographic view of subject -->
			<div>
				<div class="bp-viewport" style="--bp-i: 0">
					<img src={aboutData.photo} alt={`Elevation view of ${aboutData.name}`} />
				</div>
				<!-- Horizontal dimension under the photo -->
				<div class="mt-3 flex items-center gap-2">
					<div class="bp-dim flex-1"></div>
					<span class="bp-dim-value" use:typewriter={{ done: 1350, duration: 300 }}>FRONT ELEV.</span>
					<div class="bp-dim flex-1"></div>
				</div>
				<!-- Location tag + material hatch swatch -->
				<div class="mt-4 flex items-center gap-2">
					<span class="bp-chip" use:drawEdges use:typewriter={{ done: 1450, duration: 250 }}>DATUM</span>
					<span
						class="text-xs"
						style="color: var(--bp-graphite);"
						use:typewriter={{ done: 1500, duration: 350 }}>{aboutData.location}</span
					>
				</div>
				<div class="mt-3 flex items-center gap-2">
					<span
						class="bp-hatch inline-block h-5 w-10 border"
						style="border-color: var(--bp-ink); --hatch-delay: 1.4s;"
						aria-hidden="true"
					></span>
					<span
						class="text-[10px] tracking-widest"
						style="color: var(--bp-ink);"
						use:typewriter={{ done: 1600, duration: 300 }}>SECTION A–A</span
					>
				</div>
			</div>

			<!-- Annotated specification / bio callouts -->
			<BpBox label="Notes" i={1} cls="p-6 pt-7">
				<h2 class="bp-title mb-1 text-lg" style="color: var(--bp-ink-strong);">
					{aboutData.name}
				</h2>
				<p class="mb-5 text-xs tracking-widest" style="color: var(--bp-red);">
					REV — SOFTWARE / DATA ENGINEER
				</p>
				<ul class="space-y-3">
					{#each aboutData.description as line, i}
						<li class="bp-callout">
							<span class="mr-2 font-bold" style="color: var(--bp-ink);"
								>{String(i + 1).padStart(2, '0')}.</span
							>{line}
						</li>
					{/each}
				</ul>
			</BpBox>
		</div>
	{:else}
		<p class="text-xs" style="color: var(--bp-ink);">LOADING SHEET 01…</p>
	{/if}
</section>
