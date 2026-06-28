<script>
	import { theme } from '$lib/stores/theme.js';
	import BpAbout from './BpAbout.svelte';
	import BpHighlights from './BpHighlights.svelte';
	import BpProjects from './BpProjects.svelte';
	import BpCV from './BpCV.svelte';
	import { typewriter } from './typewriter.js';

	let currentSection = 'about';

	// The sheet is two stacked drawn boxes sharing a divider line so they read
	// as one big box. The HEADER box (nav/identity/tabs) is common to every
	// section, so it draws once on first load and then stays put. The BODY box
	// (section content + title block) is re-keyed on each section change so it
	// redraws at the new content size. Each box draws its four lines one at a
	// time in a random order; the body re-randomises on every change.
	const hdrOrder = Math.random() < 0.5 ? 'v' : 'h';
	let bodyOrder = Math.random() < 0.5 ? 'v' : 'h';

	function selectView(id) {
		if (id === currentSection) return;
		currentSection = id;
		bodyOrder = Math.random() < 0.5 ? 'v' : 'h';
	}

	const views = [
		{ id: 'about', no: '01', label: 'ABOUT', code: 'GENERAL ARRANGEMENT' },
		{ id: 'highlights', no: '02', label: 'HIGHLIGHTS', code: 'BILL OF MATERIALS' },
		{ id: 'projects', no: '03', label: 'PROJECTS', code: 'ASSEMBLY DRAWINGS' },
		{ id: 'cv', no: '04', label: 'CV', code: 'REVISION HISTORY' }
	];

	const sheetNo = { about: '01', highlights: '02', projects: '03', cv: '04' };
	const today = new Date().toISOString().slice(0, 10);

	// Zone markers along the margins
	const cols = [1, 2, 3, 4, 5, 6, 7, 8];
	const rows = ['A', 'B', 'C', 'D'];
</script>

<div class="bp-root bp-paper-bg min-h-screen w-full">
	<div class="mx-auto max-w-[1320px] px-3 py-4 md:px-6 md:py-6">
		<div class="bp-sheet-wrap">
			<!-- ===== HEADER BOX — common, draws once on first load ===== -->
			<div class="bp-hdr bp-bigbox" data-order={hdrOrder}>
				<span class="bp-edge e-top" aria-hidden="true"></span>
				<span class="bp-edge e-bottom" aria-hidden="true"></span>
				<span class="bp-edge e-left" aria-hidden="true"></span>
				<span class="bp-edge e-right" aria-hidden="true"></span>

				<div class="bp-hdr-in" use:typewriter={{ done: 1120, duration: 1150 }}>
					<!-- Top margin ruler: zone numbers + retro toggle -->
					<div class="flex items-stretch border-b-2" style="border-color: var(--bp-ink);">
						<div class="flex flex-1 items-center">
							{#each cols as c}
								<div
									class="bp-zone flex h-8 flex-1 items-center justify-center border-r"
									style="border-color: var(--bp-line-soft);"
								>
									{c}
								</div>
							{/each}
						</div>
						<a
							href="mailto:devsoham3@gmail.com"
							class="bp-tab flex items-center gap-1.5 border-y-0 border-r-0 border-l-2"
							style="border-color: var(--bp-ink);"
							title="Contact me"
						>
							<span class="material-symbols-outlined text-[16px]">mail</span> CONTACT
						</a>
						<button
							on:click={theme.toggle}
							class="bp-retro-toggle tw-skip flex items-center gap-1.5"
							title="Switch to retro theme"
						>
							<span class="material-symbols-outlined text-[16px]">videogame_asset</span> RETRO MODE
						</button>
					</div>

					<!-- Identity bar + view selector -->
					<div
						class="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
					>
						<div class="flex items-center gap-3">
							<span class="bp-balloon" style="width:30px;height:30px;">SD</span>
							<div>
								<p class="bp-title text-sm leading-tight" style="color: var(--bp-ink-strong);">
									Soham Deo — Portfolio
								</p>
								<p class="text-[10px]" style="color: var(--bp-ink);">
									DRAWING No. SD-2026 · TECHNICAL DATA SHEET
								</p>
							</div>
						</div>
						<div class="flex flex-wrap gap-2">
							{#each views as view}
								<button
									class="bp-tab"
									data-active={currentSection === view.id}
									on:click={() => selectView(view.id)}
								>
									<span class="bp-tab-label">{view.no} · {view.label}</span>
								</button>
							{/each}
						</div>
					</div>
				</div>
			</div>

			<!-- ===== BODY BOX — section content, redraws on change ===== -->
			{#key currentSection}
				<div class="bp-body bp-bigbox" data-order={bodyOrder}>
					<span class="bp-edge e-top" aria-hidden="true"></span>
					<span class="bp-edge e-bottom" aria-hidden="true"></span>
					<span class="bp-edge e-left" aria-hidden="true"></span>
					<span class="bp-edge e-right" aria-hidden="true"></span>

					<div class="bp-body-in">
						<!-- Drawing area with side zone markers -->
						<div class="flex">
							<div
								class="hidden flex-col border-r md:flex"
								style="border-color: var(--bp-line-soft);"
							>
								{#each rows as r}
									<div class="bp-zone flex w-7 flex-1 items-center justify-center">{r}</div>
								{/each}
							</div>

							<main class="bp-content min-h-[60vh] flex-1 px-5 py-8 md:px-10 md:py-10">
								{#if currentSection === 'about'}
									<BpAbout />
								{:else if currentSection === 'highlights'}
									<BpHighlights />
								{:else if currentSection === 'projects'}
									<BpProjects />
								{:else if currentSection === 'cv'}
									<BpCV />
								{/if}
							</main>

							<div
								class="hidden flex-col border-l md:flex"
								style="border-color: var(--bp-line-soft);"
							>
								{#each rows as r}
									<div class="bp-zone flex w-7 flex-1 items-center justify-center">{r}</div>
								{/each}
							</div>
						</div>

						<!-- Title block (bottom-right, like a real drawing) -->
						<div
							class="relative flex justify-end border-t-2 p-3"
							style="border-color: var(--bp-ink);"
						>
							<!-- hatched fill behind the title block so the name box pops -->
							<span class="bp-hatch bp-hatchfill" style="--hatch-delay: 1.7s;" aria-hidden="true"></span>
							<div
								class="bp-titleblock relative z-[1] grid w-full grid-cols-2 sm:w-auto sm:grid-cols-4"
								use:typewriter={{ done: 1370, duration: 900 }}
							>
								<div class="cell">
									<span class="k">Drawn By</span>
									<span class="v">S. DEO</span>
								</div>
								<div class="cell">
									<span class="k">Date</span>
									<span class="v">{today}</span>
								</div>
								<div class="cell">
									<span class="k">Scale</span>
									<span class="v">1:1</span>
								</div>
								<div class="cell">
									<span class="k">Sheet</span>
									<span class="v">{sheetNo[currentSection]} / 04</span>
								</div>
								<div class="cell col-span-2 sm:col-span-3">
									<span class="k">Title</span>
									<span class="v">{views.find((v) => v.id === currentSection)?.code}</span>
								</div>
								<div class="cell">
									<span class="k">Rev</span>
									<span class="v">A</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/key}
		</div>

		<!-- Contact strip under the sheet -->
		<div
			class="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px]"
			style="color: var(--bp-ink);"
			use:typewriter={{ done: 1900, duration: 800 }}
		>
			<span>© {new Date().getFullYear()} SOHAM DEO · ALL DIMENSIONS IN CONFIDENCE</span>
			<div class="flex gap-4">
				<a href="mailto:devsoham3@gmail.com" class="underline-offset-2 hover:underline">EMAIL</a>
				<a
					href="https://linkedin.com/in/devsoham3"
					target="_blank"
					class="underline-offset-2 hover:underline">LINKEDIN</a
				>
				<a
					href="https://github.com/devSoham3"
					target="_blank"
					class="underline-offset-2 hover:underline">GITHUB</a
				>
			</div>
		</div>
	</div>
</div>
