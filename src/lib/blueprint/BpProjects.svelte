<script>
	import { onMount } from 'svelte';
	import BpBox from './BpBox.svelte';
	import { typewriter } from './typewriter.js';
	import { drawEdges } from './drawEdges.js';
	let projectData = null;
	let error = null;

	onMount(async () => {
		try {
			const res = await fetch('/data/projects.json');
			projectData = await res.json();
		} catch (err) {
			error = err;
		}
	});
</script>

<section class="bp-root">
	{#if error}
		<p style="color: var(--bp-red);">// DRAWING DATA NOT FOUND — REF projects.json</p>
	{:else if projectData}
		<!-- Sheet heading -->
		<div class="bp-sheet-head" use:typewriter={{ done: 1260, duration: 700 }}>
			<div>
				<h1 class="bp-title text-2xl md:text-3xl">Projects</h1>
				<p class="mt-1 text-xs" style="color: var(--bp-ink);">
					SHEET 03 — PROJECT DETAILS
				</p>
			</div>
			<p class="hidden text-right text-[10px] md:block" style="color: var(--bp-ink);">
				DETAILS: {projectData.projects.length}
			</p>
		</div>

		<div class="grid grid-cols-1 gap-7 xl:grid-cols-2">
			{#each projectData.projects as project, idx}
				<BpBox label={`DET-${String(idx + 1).padStart(2, '0')}`} i={idx} cls="p-6 pt-7">
					<!-- Title row with balloon -->
					<div class="mb-4 flex items-start gap-3">
						<span class="bp-balloon">{idx + 1}</span>
						<h4 class="bp-title text-base leading-snug" style="color: var(--bp-ink-strong);">
							{project.name}
						</h4>
					</div>

					<!-- Description -->
					{#each project.description as desc}
						<p class="mb-4 text-[13px] leading-relaxed" style="color: var(--bp-graphite);">
							{desc}
						</p>
					{/each}

					<!-- Tech stack -->
					<div class="mb-4">
						<p class="mb-1.5 text-[10px] font-bold tracking-widest" style="color: var(--bp-ink);">
							TECH STACK
						</p>
						<div class="flex flex-wrap gap-1.5">
							{#each project.skillset as skill}
								<span class="bp-chip" use:drawEdges>{skill}</span>
							{/each}
						</div>
					</div>

					<!-- Objectives -->
					<div class="mb-4">
						<p class="mb-1.5 text-[10px] font-bold tracking-widest" style="color: var(--bp-ink);">
							OBJECTIVES
						</p>
						<ul class="space-y-1.5">
							{#each project.objectives as objv}
								<li class="bp-callout text-[12px]">{objv}</li>
							{/each}
						</ul>
					</div>

					<!-- Results -->
					{#if project.results.length > 0}
						<div class="border-t pt-3" style="border-color: var(--bp-line-soft);">
							<p class="mb-1.5 text-[10px] font-bold tracking-widest" style="color: var(--bp-red);">
								RESULTS
							</p>
							<ul class="space-y-1.5">
								{#each project.results as res}
									<li class="text-[12px]" style="color: var(--bp-graphite);">
										<span class="font-bold" style="color: var(--bp-red);">✓</span>
										{res}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</BpBox>
			{/each}
		</div>
	{:else}
		<p class="text-xs" style="color: var(--bp-ink);">LOADING SHEET 03…</p>
	{/if}
</section>
