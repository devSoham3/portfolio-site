<script>
	import { onMount } from 'svelte';
	import BpBox from './BpBox.svelte';
	import { typewriter } from './typewriter.js';
	import { drawEdges } from './drawEdges.js';
	let cvData = null;
	let error = null;

	// Flatten all roles + education into revision rows
	let revisions = [];

	function buildRevisions(data) {
		const rows = [];
		for (const org of data.experience.work ?? []) {
			for (const role of org.roles) {
				rows.push({ kind: 'WORK', who: org.organization, what: role.role, when: role.duration });
			}
		}
		for (const org of data.experience.academia ?? []) {
			for (const role of org.roles) {
				rows.push({ kind: 'ACAD', who: org.organization, what: role.role, when: role.duration });
			}
		}
		for (const edu of data.education ?? []) {
			rows.push({ kind: 'EDU', who: edu.institution, what: edu.degree, when: edu.duration });
		}
		for (const org of data.experience.others ?? []) {
			for (const role of org.roles) {
				rows.push({ kind: 'MISC', who: org.organization, what: role.role, when: role.duration });
			}
		}
		return rows;
	}

	function asList(resp) {
		return Array.isArray(resp) ? resp : [resp];
	}

	onMount(async () => {
		try {
			const res = await fetch('/data/cv.json');
			cvData = await res.json();
			revisions = buildRevisions(cvData);
		} catch (err) {
			error = err;
		}
	});
</script>

<section class="bp-root">
	{#if error}
		<p style="color: var(--bp-red);">// DRAWING DATA NOT FOUND — REF cv.json</p>
	{:else if cvData}
		<!-- Sheet heading -->
		<div class="bp-sheet-head" use:typewriter={{ done: 1260, duration: 700 }}>
			<div>
				<h1 class="bp-title text-2xl md:text-3xl">CV</h1>
				<p class="mt-1 text-xs" style="color: var(--bp-ink);">SHEET 04 — CAREER LOG</p>
			</div>
			<p class="hidden text-right text-[10px] md:block" style="color: var(--bp-ink);">
				REVISIONS: {revisions.length}
			</p>
		</div>

		<!-- Revision table -->
		<BpBox i={0} cls="mb-10 p-1">
			<table class="bp-table">
				<thead>
					<tr>
						<th style="width: 48px;">Rev</th>
						<th style="width: 88px;">Type</th>
						<th style="width: 200px;">Date</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{#each revisions as rev, i}
						<tr>
							<td style="font-weight: 700; color: var(--bp-ink);">
								{String.fromCharCode(65 + (revisions.length - 1 - i))}
							</td>
							<td>
								<span class="bp-chip" style="font-size: 9px;" use:drawEdges>{rev.kind}</span>
							</td>
							<td style="white-space: nowrap;">{rev.when}</td>
							<td>
								<span style="font-weight: 700;">{rev.what}</span>
								<span style="color: var(--bp-ink);"> — {rev.who}</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</BpBox>

		<!-- Detail panels -->
		<div class="space-y-7">
			<!-- Work -->
			<BpBox label="Employment" i={1} cls="p-6 pt-7">
				<div class="space-y-6">
					{#each cvData.experience.work as org}
						{#each org.roles as role}
							<div class="border-l-2 pl-4" style="border-color: var(--bp-ink);">
								<h4 class="bp-title text-base" style="color: var(--bp-ink-strong);">
									{role.role} — {org.organization}
								</h4>
								<p class="mb-2 text-[11px]" style="color: var(--bp-red);">
									{role.duration}{#if org.location} · {org.location}{/if}
								</p>
								<ul class="space-y-1.5">
									{#each asList(role.responsibilities) as resp}
										<li class="bp-callout text-[12px]">{resp}</li>
									{/each}
								</ul>
							</div>
						{/each}
					{/each}
				</div>
			</BpBox>

			<!-- Academia -->
			<BpBox label="Academic" i={2} cls="p-6 pt-7">
				<div class="space-y-6">
					{#each cvData.experience.academia as org}
						{#each org.roles as role}
							<div class="border-l-2 pl-4" style="border-color: var(--bp-ink);">
								<h4 class="bp-title text-base" style="color: var(--bp-ink-strong);">
									{role.role} — {org.organization}
								</h4>
								<p class="mb-2 text-[11px]" style="color: var(--bp-red);">{role.duration}</p>
								<ul class="space-y-1.5">
									{#each asList(role.responsibilities) as resp}
										<li class="bp-callout text-[12px]">{resp}</li>
									{/each}
								</ul>
							</div>
						{/each}
					{/each}
				</div>
			</BpBox>

			<!-- Education -->
			<BpBox label="Education" i={3} cls="p-6 pt-7">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					{#each cvData.education as edu}
						<div class="border-l-2 pl-4" style="border-color: var(--bp-ink);">
							<h4 class="bp-title text-sm" style="color: var(--bp-ink-strong);">{edu.degree}</h4>
							<p class="text-[12px]" style="color: var(--bp-graphite);">{edu.institution}</p>
							<p class="mb-3 text-[11px]" style="color: var(--bp-red);">
								{edu.duration} · GPA {edu.gpa}
							</p>
							<div class="flex flex-wrap gap-1.5">
								{#each edu.coursework as course}
									<span class="bp-chip" style="font-size: 10px;" use:drawEdges>{course}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</BpBox>

			<!-- Others -->
			{#if cvData.experience.others?.length}
				<BpBox label="Other" i={4} cls="p-6 pt-7">
					<div class="space-y-6">
						{#each cvData.experience.others as org}
							{#each org.roles as role}
								<div class="border-l-2 pl-4" style="border-color: var(--bp-ink);">
									<h4 class="bp-title text-base" style="color: var(--bp-ink-strong);">
										{role.role} — {org.organization}
									</h4>
									<p class="mb-2 text-[11px]" style="color: var(--bp-red);">{role.duration}</p>
									<ul class="space-y-1.5">
										{#each asList(role.responsibilities) as resp}
											<li class="bp-callout text-[12px]">{resp}</li>
										{/each}
									</ul>
								</div>
							{/each}
						{/each}
					</div>
				</BpBox>
			{/if}
		</div>
	{:else}
		<p class="text-xs" style="color: var(--bp-ink);">LOADING SHEET 04…</p>
	{/if}
</section>
