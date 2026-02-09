<script>
	import { onMount } from 'svelte';
	let aboutData = null;
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
			const res = await fetch('/data/about.json');
			aboutData = await res.json();
		} catch (err) {
			error = err;
		}
	});
</script>

<section id="about" class="text-foreground min-h-screen">
	{#if error}
		<p class="text-danger">Error loading data.</p>
	{:else if aboutData}
		<!-- Page Header -->
		<div
			class="border-primary from-primary/10 mb-10 flex flex-col gap-2 border-l-4 bg-gradient-to-r to-transparent py-2 pl-6"
		>
			<h1
				class="text-foreground text-glow-primary font-prsst text-3xl leading-tight tracking-tighter uppercase md:text-3xl"
			>
				System Profile <span class="text-primary">//</span> About Me
			</h1>
			<p
				class="text-secondary font-retrogm flex items-center gap-2 text-sm tracking-widest md:text-lg"
			>
				<span class="text-neon-green">&gt</span> USER DATA READY
			</p>
		</div>

		<!-- Profile Card -->
		<div
			class="bg-surface border-primary/50 shadow-neon card-flicker relative rounded-xl border p-6 md:p-8"
			on:mouseenter={randomFlicker}
			role="presentation"
		>
			<!-- Floating Label -->
			<div
				class="bg-surface text-primary border-primary/30 shadow-neon font-retrogm text-md absolute -top-3 left-4 rounded border px-2 tracking-widest"
			>
				USER_PROFILE
			</div>

			<div class="mt-2 flex flex-col items-center gap-8 md:flex-row">
				<!-- Profile Image -->
				<div class="flex-shrink-0">
					<div class="relative">
						<img
							src={aboutData.photo}
							alt={`Photo of ${aboutData.name}`}
							class="border-primary shadow-neon h-48 w-48 rounded-full border-4 object-cover md:h-64 md:w-64"
						/>
						<div
							class="bg-surface border-secondary text-secondary shadow-neon-pink font-prsst absolute -bottom-2 left-1/2 -translate-x-1/2 rounded border px-3 py-1 text-xs uppercase"
						>
							{aboutData.location}
						</div>
					</div>
				</div>

				<!-- Bio Content -->
				<div class="flex-1 space-y-4 text-center md:text-left">
					<h2 class="font-prsst text-accent text-glow-accent text-2xl uppercase md:text-3xl">
						Hey, I'm {aboutData.name.split(' ')[0]}!
					</h2>
					<h3 class="text-secondary font-mono text-base leading-relaxed font-semibold md:text-lg">
						I am a software engineer with experience in databases, research in software quality, and
						a passion for building reliable, data-driven systems.
					</h3>
					<div class="mt-6 space-y-4">
						{#each aboutData.description as desc_para}
							<p
								class="text-foreground text-justify font-mono text-sm leading-relaxed font-semibold md:text-base"
							>
								{desc_para}
							</p>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Terminal Status -->
		<div
			class="border-border bg-background/80 text-muted mt-8 rounded border p-4 font-mono text-sm shadow-inner"
		>
			<p><span class="text-neon-green">user@dev-os:~$</span> whoami</p>
			<p class="mt-1 ml-4">&gt; NAME: <span class="text-primary">{aboutData.name}</span></p>
			<p class="ml-4">&gt; LOCATION: <span class="text-accent">{aboutData.location}</span></p>
			<p class="ml-4">&gt; STATUS: <span class="text-secondary">AVAILABLE</span></p>
			<p class="mt-2"><span class="text-neon-green animate-pulse">_</span></p>
		</div>
	{:else}
		<!-- Skeleton Loader -->
		<div class="border-primary/30 mb-10 flex animate-pulse flex-col gap-2 border-l-4 py-2 pl-6">
			<div class="bg-surface h-10 w-2/3 rounded"></div>
			<div class="bg-surface h-6 w-1/3 rounded"></div>
		</div>
		<div class="bg-surface border-border/50 animate-pulse rounded-xl border p-8">
			<div class="flex flex-col items-center gap-8 md:flex-row">
				<div class="bg-border h-64 w-64 rounded-full"></div>
				<div class="flex-1 space-y-4">
					<div class="bg-border h-10 w-1/2 rounded"></div>
					<div class="bg-border h-6 w-full rounded"></div>
					<div class="bg-border h-6 w-full rounded"></div>
					<div class="bg-border h-6 w-3/4 rounded"></div>
				</div>
			</div>
		</div>
	{/if}
</section>
