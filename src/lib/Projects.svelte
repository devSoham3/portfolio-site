<script>
	import { onMount } from 'svelte';
	let projectData = null;
	let error = null;

	// Neon colors for random flicker effect
	const neonColors = [
		{ color: '#13b6ec', rgb: '19, 182, 236' }, // Cyan
		{ color: '#ff00ff', rgb: '255, 0, 255' }, // Magenta
		{ color: '#ffbf00', rgb: '255, 191, 0' }, // Amber
		{ color: '#a855f7', rgb: '168, 85, 247' }, // Purple
		{ color: '#22c55e', rgb: '34, 197, 94' } // Green
	];

	function randomFlicker(event) {
		const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
		event.currentTarget.style.setProperty('--flicker-color', randomColor.color);
		event.currentTarget.style.setProperty('--flicker-rgb', randomColor.rgb);
	}

	onMount(async () => {
		try {
			const res = await fetch('/data/projects.json');
			projectData = await res.json();
		} catch (err) {
			error = err;
		}
	});
</script>

<section id="projects" class="text-foreground min-h-screen">
	{#if error}
		<p class="text-danger">Error loading data.</p>
	{:else if projectData}
		<!-- Page Header -->
		<div
			class="border-accent from-accent/10 mb-10 flex flex-col gap-2 border-l-4 bg-gradient-to-r to-transparent py-2 pl-6"
		>
			<h1
				class="text-foreground text-glow-accent font-prsst text-3xl leading-tight tracking-tighter uppercase md:text-3xl"
			>
				Project Archive <span class="text-accent">//</span> Builds
			</h1>
			<p
				class="text-primary font-retrogm flex items-center gap-2 text-sm tracking-widest md:text-lg"
			>
				<span class="text-neon-green">&gt</span> PROJECT DATA LOADED
			</p>
		</div>

		<!-- Projects Grid -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{#each projectData.projects as project, idx}
				{@const colors = ['primary', 'secondary', 'accent', 'neon-purple', 'neon-green']}
				{@const color = colors[idx % colors.length]}
				<div
					class="group bg-surface card-flicker relative border border-{color}/50 rounded-xl p-6 shadow-neon-{color ===
					'primary'
						? ''
						: color === 'secondary'
							? 'pink'
							: color === 'accent'
								? 'amber'
								: color === 'neon-purple'
									? 'purple'
									: 'green'} transition-all duration-300 hover:shadow-lg"
					on:mouseenter={randomFlicker}
					role="presentation"
				>
					<!-- Floating Label -->
					<div
						class="bg-surface absolute -top-3 left-4 px-2 text-{color} font-retrogm border tracking-widest border-{color}/30 shadow-neon text-md rounded"
					>
						PROJECT_{String(idx + 1).padStart(2, '0')}
					</div>

					<!-- Project Name -->
					<h4 class="font-retrogm text-secondary mt-1 mb-3 text-lg md:text-xl">{project.name}</h4>

					<!-- Description -->
					<div class="mb-4 space-y-2">
						{#each project.description as desc}
							<p class="text-foreground font-pixelopt text-md leading-relaxed">{desc}</p>
						{/each}
					</div>

					<!-- Skillset Tags -->
					<div class="mb-4">
						<h5 class="text-primary font-retrogm mb-2 font-mono text-xs tracking-wider">
							TECH_STACK:
						</h5>
						<div class="flex flex-wrap gap-2">
							{#each project.skillset as skill}
								<span
									class="bg-surface-light border-primary/30 text-primary font-pixelopt rounded border px-2 py-1 text-xs"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>

					<!-- Objectives -->
					<div class="mb-4">
						<h5 class="text-accent font-retrogm mb-2 font-mono text-xs tracking-wider">
							OBJECTIVES:
						</h5>
						<ul class="space-y-1">
							{#each project.objectives as objv}
								<li class="text-muted font-pixellari flex items-start gap-2 text-sm">
									<span class="text-accent">&gt</span>
									{objv}
								</li>
							{/each}
						</ul>
					</div>

					<!-- Results (if any) -->
					{#if project.results.length > 0}
						<div>
							<h5 class="text-neon-green font-retrogm mb-2 font-mono text-xs tracking-wider">
								RESULTS:
							</h5>
							<ul class="space-y-1">
								{#each project.results as res}
									<li class="text-neon-green font-pixellari flex items-start gap-2 text-sm">
										<span>&gt</span>
										{res}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Terminal Status -->
		<div
			class="border-border bg-background/80 text-muted mt-12 rounded border p-4 font-mono text-sm shadow-inner"
		>
			<p><span class="text-neon-green">user@dev-os:~$</span> project_list --count</p>
			<p class="mt-1 ml-4">
				&gt; TOTAL PROJECTS: <span class="text-primary">{projectData.projects.length}</span>
			</p>
			<p class="ml-4">
				&gt; BUILD STATUS: <span class="text-neon-green">ALL SYSTEMS OPERATIONAL</span>
			</p>
			<p class="mt-2"><span class="text-neon-green animate-pulse">_</span></p>
		</div>
	{:else}
		<!-- Skeleton Loader -->
		<div class="border-accent/30 mb-10 flex animate-pulse flex-col gap-2 border-l-4 py-2 pl-6">
			<div class="bg-surface h-10 w-2/3 rounded"></div>
			<div class="bg-surface h-6 w-1/3 rounded"></div>
		</div>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{#each [1, 2, 3, 4] as _}
				<div class="bg-surface border-border/50 animate-pulse rounded-xl border p-6">
					<div class="bg-border mb-4 h-6 w-2/3 rounded"></div>
					<div class="bg-border mb-2 h-4 w-full rounded"></div>
					<div class="bg-border mb-4 h-4 w-3/4 rounded"></div>
					<div class="flex flex-wrap gap-2">
						{#each [1, 2, 3] as __}
							<div class="bg-border h-6 w-16 rounded"></div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
