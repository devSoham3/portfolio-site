<script>
	import { onMount } from 'svelte';
	let cvData = null;
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
			const res = await fetch('/data/cv.json');
			cvData = await res.json();
		} catch (err) {
			error = err;
		}
	});
</script>

<section id="cv" class="text-foreground min-h-screen">
	{#if error}
		<p class="text-danger">Error loading data.</p>
	{:else if cvData}
		<!-- Page Header -->
		<div
			class="border-neon-purple from-neon-purple/10 mb-10 flex flex-col gap-2 border-l-4 bg-gradient-to-r to-transparent py-2 pl-6"
		>
			<h1
				class="text-foreground font-prsst text-3xl leading-tight tracking-tighter uppercase md:text-3xl"
				style="text-shadow: 0 0 8px rgba(168, 85, 247, 0.6);"
			>
				Curriculum Vitae <span class="text-neon-purple">//</span> Experience Log
			</h1>
			<p
				class="text-primary font-retrogm flex items-center gap-2 text-sm tracking-widest md:text-lg"
			>
				<span class="text-neon-green">&gt</span> CAREER DATA READY
			</p>
		</div>

		<!-- Work Experience Section -->
		<div
			class="bg-surface border-primary/50 shadow-neon card-flicker relative mb-8 rounded-xl border p-6"
			on:mouseenter={randomFlicker}
			role="presentation"
		>
			<div
				class="bg-surface text-primary border-primary/30 shadow-neon font-retrogm text-md absolute -top-3 left-4 rounded border px-2 tracking-widest"
			>
				WORK_EXPERIENCE
			</div>

			<div class="mt-2 space-y-8">
				{#each cvData.experience.work as org}
					{#each org.roles as role}
						<div class="border-secondary border-l-2 pl-4">
							<h4 class="font-retrogm text-lg md:text-xl">
								<span class="text-secondary font-prsst">{role.role}</span>
								<span class="text-muted"> @ </span>
								<span class="text-foreground">{org.organization}</span>
							</h4>
							<p class="font-pixelopt text-accent mb-3 text-sm">
								{role.duration}
								{#if org.location}
									<span class="text-muted"> • {org.location}</span>
								{/if}
							</p>
							{#if Array.isArray(role.responsibilities)}
								<ul class="space-y-2">
									{#each role.responsibilities as resp}
										<li class="text-muted font-pixellari text-md flex items-start gap-2">
											<span class="text-primary">&gt</span>
											<span>{resp}</span>
										</li>
									{/each}
								</ul>
							{:else}
								<p class="font-pixellari text-muted text-sm">{role.responsibilities}</p>
							{/if}
						</div>
					{/each}
				{/each}
			</div>
		</div>

		<!-- Academic Experience Section -->
		<div
			class="bg-surface border-secondary/50 shadow-neon-pink card-flicker relative mb-8 rounded-xl border p-6"
			on:mouseenter={randomFlicker}
			role="presentation"
		>
			<div
				class="bg-surface text-secondary border-secondary/30 shadow-neon-pink font-retrogm text-md absolute -top-3 left-4 rounded border px-2 tracking-widest"
			>
				ACADEMIC_EXPERIENCE
			</div>

			<div class="mt-2 space-y-8">
				{#each cvData.experience.academia as org}
					<div>
						<h3 class="font-retrogm text-foreground mb-1 text-xl">{org.organization}</h3>
						{#if org.location}
							<p class="font-pixelopt text-muted mb-4 text-sm">{org.location}</p>
						{/if}
						{#each org.roles as role}
							<div class="border-primary mb-4 border-l-2 pl-4">
								<h4 class="font-retrogm text-primary text-lg">{role.role}</h4>
								<p class="font-pixelopt text-accent mb-2 text-sm">{role.duration}</p>
								{#if Array.isArray(role.responsibilities)}
									<ul class="space-y-1">
										{#each role.responsibilities as resp}
											<li class="font-pixellari text-muted text-md flex items-start gap-2">
												<span class="text-secondary">&gt</span>
												<span>{resp}</span>
											</li>
										{/each}
									</ul>
								{:else}
									<p class="font-pixellari text-muted text-sm">{role.responsibilities}</p>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>

		<!-- Education Section -->
		<div
			class="bg-surface border-accent/50 shadow-neon-amber card-flicker relative mb-8 rounded-xl border p-6"
			on:mouseenter={randomFlicker}
			role="presentation"
		>
			<div
				class="bg-surface text-accent border-accent/30 shadow-neon-amber font-retrogm text-md absolute -top-3 left-4 rounded border px-2 tracking-widest"
			>
				EDUCATION
			</div>

			<div class="mt-2 space-y-8">
				{#each cvData.education as edu}
					<div class="border-neon-green border-l-2 pl-4">
						<h4 class="font-retrogm text-foreground text-lg">{edu.institution}</h4>
						<p class="font-retrogm text-secondary mb-2 text-xl">{edu.degree}</p>
						<p class="font-pixelopt mb-3 text-sm">
							<span class="text-accent">{edu.duration}</span>
							<span class="text-muted"> • GPA: </span>
							<span class="font-prsst text-neon-green">{edu.gpa}</span>
						</p>
						<div class="flex flex-wrap gap-2">
							{#each edu.coursework as course}
								<span
									class="bg-surface-light border-neon-green/30 text-neon-green rounded border px-2 py-1 font-mono text-xs"
								>
									{course}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Terminal Status -->
		<div
			class="border-border bg-background/80 text-muted mt-8 rounded border p-4 font-mono text-sm shadow-inner"
		>
			<p><span class="text-neon-green">user@dev-os:~$</span> cv --summary</p>
			<p class="mt-1 ml-4">
				&gt; WORK_EXP: <span class="text-primary">{cvData.experience.work.length}</span> POSITIONS
			</p>
			<p class="ml-4">
				&gt; ACADEMIC: <span class="text-secondary">{cvData.experience.academia.length}</span> ROLES
			</p>
			<p class="ml-4">
				&gt; EDUCATION: <span class="text-accent">{cvData.education.length}</span> DEGREES
			</p>
			<p class="mt-2"><span class="text-neon-green animate-pulse">_</span></p>
		</div>
	{:else}
		<!-- Skeleton Loader -->
		<div class="border-neon-purple/30 mb-10 flex animate-pulse flex-col gap-2 border-l-4 py-2 pl-6">
			<div class="bg-surface h-10 w-2/3 rounded"></div>
			<div class="bg-surface h-6 w-1/3 rounded"></div>
		</div>
		<div class="space-y-8">
			{#each [1, 2, 3] as _}
				<div class="bg-surface border-border/50 animate-pulse rounded-xl border p-6">
					<div class="bg-border mb-4 h-6 w-1/4 rounded"></div>
					<div class="space-y-2">
						<div class="bg-border h-4 w-full rounded"></div>
						<div class="bg-border h-4 w-3/4 rounded"></div>
						<div class="bg-border h-4 w-1/2 rounded"></div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
