<script>
	import { onMount } from 'svelte';
	import BpBox from './BpBox.svelte';
	import { typewriter } from './typewriter.js';
	import { drawEdges } from './drawEdges.js';
	let highlightData = null;
	let error = null;

	onMount(async () => {
		try {
			const res = await fetch('/data/highlights.json');
			highlightData = await res.json();
		} catch (err) {
			error = err;
		}
	});
</script>

<section class="bp-root">
	{#if error}
		<p style="color: var(--bp-red);">// DRAWING DATA NOT FOUND — REF highlights.json</p>
	{:else if highlightData}
		<!-- Sheet heading -->
		<div class="bp-sheet-head" use:typewriter={{ done: 1260, duration: 700 }}>
			<div>
				<h1 class="bp-title text-2xl md:text-3xl">Highlights</h1>
				<p class="mt-1 text-xs" style="color: var(--bp-ink);">
					SHEET 02 — CAPABILITY INVENTORY
				</p>
			</div>
			<p class="hidden text-right text-[10px] md:block" style="color: var(--bp-ink);">
				ITEMS: {highlightData.skills.reduce((n, s) => n + s.items.length, 0)}<br />
				GROUPS: {highlightData.skills.length}
			</p>
		</div>

		<!-- BOM table -->
		<BpBox i={0} cls="p-1">
			<table class="bp-table">
				<thead>
					<tr>
						<th style="width: 48px;">Item</th>
						<th style="width: 220px;">Assembly</th>
						<th>Components</th>
						<th style="width: 56px;">Qty</th>
					</tr>
				</thead>
				<tbody>
					{#each highlightData.skills as group, i}
						<tr>
							<td style="font-weight: 700; color: var(--bp-ink);">
								{String(i + 1).padStart(2, '0')}
							</td>
							<td style="font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">
								{group.category}
							</td>
							<td>
								<div class="flex flex-wrap gap-1.5">
									{#each group.items as item}
										<span class="bp-chip" use:drawEdges>{item}</span>
									{/each}
								</div>
							</td>
							<td style="text-align: center; color: var(--bp-ink);">{group.items.length}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</BpBox>

		<p
			class="mt-3 text-right text-[10px]"
			style="color: var(--bp-ink);"
			use:typewriter={{ done: 3100, duration: 350 }}
		>
			— END OF PARTS LIST —
		</p>
	{:else}
		<p class="text-xs" style="color: var(--bp-ink);">LOADING SHEET 02…</p>
	{/if}
</section>
