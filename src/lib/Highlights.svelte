<script>
	import { onMount } from 'svelte';
	let highlightData = null;
	let error = null;

	// Category to style mapping
	const categoryStyles = {
		'Programming Languages': {
			borderColor: 'border-primary/50',
			labelBg: 'text-primary border-primary/30',
			shadow: 'shadow-neon',
			hoverBorder: 'hover:border-primary',
			textColor: 'text-primary'
		},
		'Frameworks & Libraries': {
			borderColor: 'border-secondary/50',
			labelBg: 'text-secondary border-secondary/30',
			shadow: 'shadow-neon-pink',
			hoverBorder: 'hover:border-secondary',
			textColor: 'text-secondary'
		},
		Tools: {
			borderColor: 'border-accent/50',
			labelBg: 'text-accent border-accent/30',
			shadow: 'shadow-neon-amber',
			hoverBorder: 'hover:border-accent',
			textColor: 'text-accent'
		},
		'Cloud Platforms': {
			borderColor: 'border-neon-purple/50',
			labelBg: 'text-neon-purple border-neon-purple/30',
			shadow: 'shadow-neon-purple',
			hoverBorder: 'hover:border-neon-purple',
			textColor: 'text-neon-purple'
		},
		Databases: {
			borderColor: 'border-primary/50',
			labelBg: 'text-primary border-primary/30',
			shadow: 'shadow-neon',
			hoverBorder: 'hover:border-primary',
			textColor: 'text-primary'
		},
		Software: {
			borderColor: 'border-secondary/50',
			labelBg: 'text-secondary border-secondary/30',
			shadow: 'shadow-neon-pink',
			hoverBorder: 'hover:border-secondary',
			textColor: 'text-secondary'
		},
		Analytics: {
			borderColor: 'border-accent/50',
			labelBg: 'text-accent border-accent/30',
			shadow: 'shadow-neon-amber',
			hoverBorder: 'hover:border-accent',
			textColor: 'text-accent'
		},
		'Soft Skills': {
			borderColor: 'border-neon-green/50',
			labelBg: 'text-neon-green border-neon-green/30',
			shadow: 'shadow-neon-green',
			hoverBorder: 'hover:border-neon-green',
			textColor: 'text-neon-green'
		},
		'Spoken Languages': {
			borderColor: 'border-neon-purple/50',
			labelBg: 'text-neon-purple border-neon-purple/30',
			shadow: 'shadow-neon-purple',
			hoverBorder: 'hover:border-neon-purple',
			textColor: 'text-neon-purple'
		},
		'Other Interests': {
			borderColor: 'border-primary/50',
			labelBg: 'text-primary border-primary/30',
			shadow: 'shadow-neon',
			hoverBorder: 'hover:border-primary',
			textColor: 'text-primary'
		}
	};

	const defaultStyle = {
		borderColor: 'border-primary/50',
		labelBg: 'text-primary border-primary/30',
		shadow: 'shadow-neon',
		hoverBorder: 'hover:border-primary',
		textColor: 'text-primary'
	};

	function getStyle(category) {
		return categoryStyles[category] || defaultStyle;
	}

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
			const res = await fetch('/data/highlights.json');
			highlightData = await res.json();
		} catch (err) {
			error = err;
		}
	});
</script>

<section id="highlights" class="text-foreground min-h-screen">
	{#if error}
		<p class="text-danger">Error loading data.</p>
	{:else if highlightData}
		<!-- Page Header -->
		<div
			class="border-secondary from-secondary/10 mb-10 flex flex-col gap-2 border-l-4 bg-gradient-to-r to-transparent py-2 pl-6"
		>
			<h1
				class="text-foreground text-glow-secondary font-prsst text-3xl leading-tight tracking-tighter uppercase md:text-3xl"
			>
				System Highlights <span class="text-secondary">//</span> Skills Database
			</h1>
			<p
				class="text-primary font-retrogm flex items-center gap-2 text-sm tracking-widest md:text-lg"
			>
				<span class="text-neon-green">&gt</span> SKILL MODULES LOADED
			</p>
		</div>

		<!-- Dashboard Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each highlightData.skills as skill}
				{@const style = getStyle(skill.category)}
				<div
					class="group bg-surface card-flicker relative border {style.borderColor} rounded-xl p-6 {style.shadow} transition-all duration-300 hover:shadow-lg {skill.category ===
						'Soft Skills' || skill.category === 'Analytics'
						? 'md:col-span-2'
						: ''}"
					on:mouseenter={randomFlicker}
					role="presentation"
				>
					<!-- Floating Label -->
					<div
						class="bg-surface font-retrogm text-md absolute -top-3 left-4 rounded border px-2 tracking-widest {style.labelBg} {style.shadow}"
					>
						{skill.category.toUpperCase()}
					</div>

					<!-- Skills Grid -->
					<div
						class="grid grid-cols-2 {skill.category === 'Soft Skills' ||
						skill.category === 'Analytics'
							? 'md:grid-cols-4'
							: ''} mt-2 gap-3"
					>
						{#each skill.items as item}
							<div
								class="glitch-hover bg-surface-light border-border flex flex-col items-center justify-center rounded border p-3 {style.hoverBorder} hover:bg-surface cursor-default transition-colors"
							>
								<span class="{style.textColor} text-center font-mono text-sm font-bold">{item}</span
								>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<!-- Terminal Status Output -->
		<div
			class="border-border bg-background/80 text-muted mt-12 rounded border p-4 font-mono text-sm shadow-inner"
		>
			<p><span class="text-neon-green">user@dev-os:~$</span> check_status --all</p>
			<p class="mt-1 ml-4">&gt; LOADING ASSETS... <span class="text-foreground">DONE</span></p>
			<p class="ml-4">
				&gt; SKILLS COUNT: <span class="text-primary">{highlightData.skills.length}</span> CATEGORIES
			</p>
			<p class="ml-4">&gt; RENDER MODE: <span class="text-secondary">RETRO_HIGH_DEF</span></p>
			<p class="mt-2"><span class="text-neon-green animate-pulse">_</span></p>
		</div>
	{:else}
		<!-- Skeleton Loader -->
		<div class="border-secondary/30 mb-10 flex animate-pulse flex-col gap-2 border-l-4 py-2 pl-6">
			<div class="bg-surface h-10 w-3/4 rounded"></div>
			<div class="bg-surface h-6 w-1/2 rounded"></div>
		</div>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each [1, 2, 3, 4, 5, 6] as _}
				<div class="bg-surface border-border/50 animate-pulse rounded-xl border p-6">
					<div class="bg-border mb-4 h-4 w-1/3 rounded"></div>
					<div class="grid grid-cols-2 gap-3">
						{#each [1, 2, 3, 4] as __}
							<div class="bg-surface-light h-12 rounded"></div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</section>
