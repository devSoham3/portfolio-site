<script>
	import { onMount } from 'svelte';
	// Import your component sections
	import About from '$lib/About.svelte';
	import Highlights from '$lib/Highlights.svelte';
	import CV from '$lib/CV.svelte';
	import Projects from '$lib/Projects.svelte';

	// use a current section to display only selected tab
	let currentSection = 'about';
	let isLoading = false;
	let loadingMessage = '';
	let activeBlocks = 0;
	const totalBlocks = 10;

	// Footer state - expanded when scrolled to bottom
	let isFooterExpanded = false;

	// Marquee phrases
	let leftPhrases = [];
	let rightPhrases = [];

	// Neon colors for random assignment
	const neonColors = [
		'text-primary', // Cyan
		'text-secondary', // Magenta
		'text-accent', // Amber
		'text-neon-purple', // Purple
		'text-neon-green' // Green
	];

	// Retro fonts for random assignment
	const retroFonts = [
		'font-prsst',
		'font-alagard',
		'font-kiwi',
		'font-minecraft',
		'font-pixellari',
		'font-retrogm',
		'font-pixelopt'
	];

	// Get random item from array
	function getRandomItem(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	// Process phrases with random colors and fonts
	function processPhrases(phrases) {
		return phrases.map((text) => ({
			text,
			color: getRandomItem(neonColors),
			font: getRandomItem(retroFonts)
		}));
	}

	// Check if user has scrolled to bottom
	function checkScroll() {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;
		// Consider "at bottom" when within 100px of the bottom
		isFooterExpanded = scrollTop + clientHeight >= scrollHeight - 100;
	}

	// Loading messages for each section
	const loadingMessages = {
		about: 'LOADING PROFILE DATA',
		highlights: 'LOADING SKILL MODULES',
		projects: 'LOADING PROJECT DATA',
		cv: 'LOADING CAREER DATA'
	};

	async function navigateTo(section) {
		if (section === currentSection) return;

		loadingMessage = loadingMessages[section] || 'LOADING';
		activeBlocks = 0;
		isLoading = true;

		// Random delay between 500ms and 3000ms
		const loadingDuration = Math.floor(Math.random() * 2500) + 500;
		const blockInterval = loadingDuration / totalBlocks;

		// Animate blocks filling up
		for (let i = 1; i <= totalBlocks; i++) {
			await new Promise((resolve) => setTimeout(resolve, blockInterval));
			activeBlocks = i;
		}

		currentSection = section;
		isLoading = false;
	}

	onMount(async () => {
		// Add scroll listener for footer expansion
		window.addEventListener('scroll', checkScroll);
		checkScroll(); // Initial check

		try {
			const res = await fetch('/data/phrases.json');
			const data = await res.json();
			// Double the phrases for seamless scrolling loop
			leftPhrases = [...processPhrases(data.left), ...processPhrases(data.left)];
			rightPhrases = [...processPhrases(data.right), ...processPhrases(data.right)];
		} catch (err) {
			console.error('Failed to load phrases:', err);
		}

		return () => {
			window.removeEventListener('scroll', checkScroll);
		};
	});
</script>

<!-- Scanlines Overlay -->
<div class="scanlines"></div>

<!-- Background Grid -->
<div class="grid-pattern pointer-events-none fixed inset-0 z-0 opacity-20"></div>

<!-- Left Marquee - Responsive: always visible with smaller text on smaller screens -->
<div
	class="pointer-events-none fixed top-0 left-0 z-10 h-screen w-6 overflow-hidden md:w-8 lg:left-4 2xl:left-[calc(50%-38rem)]"
>
	<div class="marquee-vertical-left flex h-full flex-col items-center bg-transparent">
		<div
			class="marquee-content-left text-[8px] tracking-widest whitespace-nowrap sm:text-[10px] md:text-xs 2xl:text-sm"
			style="writing-mode: vertical-rl; text-orientation: mixed;"
		>
			{#each leftPhrases as phrase}
				<span class="{phrase.color} {phrase.font}"> // {phrase.text} </span>
			{/each}
		</div>
	</div>
</div>

<!-- Right Marquee - Responsive: always visible with smaller text on smaller screens -->
<div
	class="pointer-events-none fixed top-0 right-0 z-10 h-screen w-6 overflow-hidden md:w-8 lg:right-4 2xl:right-[calc(50%-38rem)]"
>
	<div class="marquee-vertical-right flex h-full flex-col items-center bg-transparent">
		<div
			class="marquee-content-right text-[8px] tracking-widest whitespace-nowrap sm:text-[10px] md:text-xs 2xl:text-sm"
			style="writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);"
		>
			{#each rightPhrases as phrase}
				<span class="{phrase.color} {phrase.font}"> // {phrase.text} </span>
			{/each}
		</div>
	</div>
</div>

<!-- Main container for entire page -->
<div class="bg-background flex min-h-screen flex-col">
	<!-- Top Navigation -->
	<nav class="glass border-border sticky top-0 z-40 border-b">
		<div
			class="container mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-10"
		>
			<!-- Nav Links - Terminal icon and logo name move with active section -->
			<ul class="hidden items-center gap-4 md:flex lg:gap-6">
				<li>
					<button
						on:click={() => navigateTo('about')}
						class="font-retrogm flex items-center gap-2 rounded-lg border px-3 py-2 text-sm tracking-widest transition-all {currentSection ===
						'about'
							? 'text-primary border-primary shadow-neon'
							: 'text-muted hover:text-primary hover:border-primary/50 border-transparent'}"
					>
						{#if currentSection === 'about'}<span
								class="border-primary shadow-neon flex size-6 items-center justify-center rounded border"
								><span class="material-symbols-outlined text-[16px]">terminal</span></span
							><span class="text-foreground uppercase">Soham_Deo</span><span class="text-muted"
								>.</span
							>{/if}ABOUT
					</button>
				</li>
				<li>
					<button
						on:click={() => navigateTo('highlights')}
						class="font-retrogm flex items-center gap-2 rounded-lg border px-3 py-2 text-sm tracking-widest transition-all {currentSection ===
						'highlights'
							? 'text-primary border-primary shadow-neon'
							: 'text-muted hover:text-primary hover:border-primary/50 border-transparent'}"
					>
						{#if currentSection === 'highlights'}<span
								class="border-primary shadow-neon flex size-6 items-center justify-center rounded border"
								><span class="material-symbols-outlined text-[16px]">terminal</span></span
							><span class="text-foreground uppercase">Soham_Deo</span><span class="text-muted"
								>.</span
							>{/if}HIGHLIGHTS
					</button>
				</li>
				<li>
					<button
						on:click={() => navigateTo('projects')}
						class="font-retrogm flex items-center gap-2 rounded-lg border px-3 py-2 text-sm tracking-widest transition-all {currentSection ===
						'projects'
							? 'text-primary border-primary shadow-neon'
							: 'text-muted hover:text-primary hover:border-primary/50 border-transparent'}"
					>
						{#if currentSection === 'projects'}<span
								class="border-primary shadow-neon flex size-6 items-center justify-center rounded border"
								><span class="material-symbols-outlined text-[16px]">terminal</span></span
							><span class="text-foreground uppercase">Soham_Deo</span><span class="text-muted"
								>.</span
							>{/if}PROJECTS
					</button>
				</li>
				<li>
					<button
						on:click={() => navigateTo('cv')}
						class="font-retrogm flex items-center gap-2 rounded-lg border px-3 py-2 text-sm tracking-widest transition-all {currentSection ===
						'cv'
							? 'text-primary border-primary shadow-neon'
							: 'text-muted hover:text-primary hover:border-primary/50 border-transparent'}"
					>
						{#if currentSection === 'cv'}<span
								class="border-primary shadow-neon flex size-6 items-center justify-center rounded border"
								><span class="material-symbols-outlined text-[16px]">terminal</span></span
							><span class="text-foreground uppercase">Soham_Deo</span><span class="text-muted"
								>.</span
							>{/if}CV
					</button>
				</li>
			</ul>

			<!-- Mobile Menu - Shows terminal icon + logo + section name -->
			<div class="flex items-center gap-3 md:hidden">
				<div
					class="text-primary border-primary shadow-neon flex items-center gap-2 rounded-lg border px-3 py-2"
				>
					<span class="border-primary flex size-5 items-center justify-center rounded border">
						<span class="material-symbols-outlined text-[14px]">terminal</span>
					</span>
					<span class="font-retrogm text-foreground text-xs tracking-widest uppercase"
						>Soham_Deo</span
					>
					<span class="text-muted font-retrogm text-xs">.</span>
					<select
						class="text-primary font-retrogm cursor-pointer bg-transparent text-xs tracking-widest uppercase outline-none"
						on:change={(e) => navigateTo(e.target.value)}
						bind:value={currentSection}
					>
						<option value="about" class="bg-background text-foreground">ABOUT</option>
						<option value="highlights" class="bg-background text-foreground">HIGHLIGHTS</option>
						<option value="projects" class="bg-background text-foreground">PROJECTS</option>
						<option value="cv" class="bg-background text-foreground">CV</option>
					</select>
				</div>
			</div>

			<!-- Contact Button (Desktop) -->
			<a
				href="mailto:devsoham3@gmail.com"
				class="bg-primary text-background hover:bg-foreground hover:shadow-neon font-prsst hidden h-10 items-center justify-center rounded px-6 text-sm tracking-widest transition-all md:flex"
			>
				CONTACT_ME
			</a>
		</div>
	</nav>

	<!-- Main Content -->
	<main
		class="crt-flicker relative z-10 container mx-auto max-w-[1200px] flex-grow px-6 py-8 sm:px-12 lg:px-10"
	>
		{#if isLoading}
			<!-- Loading State -->
			<div class="flex min-h-[60vh] flex-col items-center justify-center gap-6">
				<div
					class="border-primary from-primary/10 flex w-full max-w-lg flex-col gap-2 border-l-4 bg-gradient-to-r to-transparent py-2 pl-6"
				>
					<h1
						class="text-foreground text-glow-primary font-prsst text-2xl leading-tight tracking-tighter uppercase md:text-3xl"
					>
						{loadingMessage}<span class="loading-dots"></span>
					</h1>
					<!-- Loading Bar -->
					<div class="mt-3 w-full">
						<div class="bg-surface border-border flex gap-1 rounded border p-1">
							{#each Array(totalBlocks) as _, i}
								<div
									class="loading-block h-4 flex-1 rounded-sm transition-all duration-100"
									class:active={i < activeBlocks}
								></div>
							{/each}
						</div>
						<p class="text-muted mt-1 text-right font-mono text-xs">
							{Math.round((activeBlocks / totalBlocks) * 100)}%
						</p>
					</div>
				</div>

				<!-- Terminal-style progress -->
				<div
					class="border-border bg-background/80 text-muted w-full max-w-lg rounded border p-4 font-mono text-sm"
				>
					<p>
						<span class="text-neon-green">user@dev-os:~$</span> load --section {currentSection ||
							'next'}
					</p>
					<p class="mt-1 ml-4">&gt; FETCHING DATA<span class="loading-dots"></span></p>
					<p class="ml-4">
						&gt; STATUS: <span class="text-accent animate-pulse">IN_PROGRESS</span>
					</p>
					<p class="mt-2"><span class="text-neon-green animate-pulse">_</span></p>
				</div>
			</div>
		{:else if currentSection === 'about'}
			<About />
		{:else if currentSection === 'highlights'}
			<Highlights />
		{:else if currentSection === 'projects'}
			<Projects />
		{:else if currentSection === 'cv'}
			<CV />
		{/if}
	</main>

	<!-- Footer - Sticky with minimal/expanded states -->
	<footer class="border-border glass sticky bottom-0 z-40 border-t transition-all duration-300">
		{#if isFooterExpanded}
			<!-- Expanded Footer -->
			<div
				class="container mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row md:px-10"
			>
				<div class="flex flex-col gap-1 text-center md:text-left">
					<div class="text-foreground flex items-center justify-center gap-2 md:justify-start">
						<span class="material-symbols-outlined text-primary">wifi</span>
						<span class="font-retrogm text-sm tracking-widest">CONNECTION_ESTABLISHED</span>
					</div>
					<p class="text-muted font-mono text-xs">SECURE_LINE: devsoham3@gmail.com</p>
				</div>
				<div class="flex items-center gap-4">
					<span class="text-secondary font-retrogm hidden text-sm tracking-wide md:block"
						>CONNECT →</span
					>
					<div class="flex gap-3">
						<a
							href="mailto:devsoham3@gmail.com"
							class="border-primary hover:bg-primary text-primary hover:text-background shadow-neon flex items-center justify-center gap-2 rounded-lg border-2 bg-transparent px-4 py-2 transition-all duration-300"
						>
							<span class="material-symbols-outlined text-lg">mail</span>
							<span class="font-retrogm hidden text-sm tracking-widest sm:inline">EMAIL</span>
						</a>
						<a
							href="https://linkedin.com/in/devsoham3"
							target="_blank"
							class="border-secondary hover:bg-secondary text-secondary hover:text-background shadow-neon-pink flex items-center justify-center gap-2 rounded-lg border-2 bg-transparent px-4 py-2 transition-all duration-300"
						>
							<span class="font-retrogm text-sm tracking-widest">LinkedIn</span>
						</a>
						<a
							href="https://github.com/devSoham3"
							target="_blank"
							class="border-accent hover:bg-accent text-accent hover:text-background shadow-neon-amber flex items-center justify-center gap-2 rounded-lg border-2 bg-transparent px-4 py-2 transition-all duration-300"
						>
							<span class="font-retrogm text-sm tracking-widest">GitHub</span>
						</a>
					</div>
				</div>
			</div>
		{:else}
			<!-- Minimal Footer - Icons only -->
			<div
				class="container mx-auto flex max-w-[1200px] items-center justify-between px-6 py-2 md:px-10"
			>
				<div class="text-foreground flex items-center gap-2">
					<span class="material-symbols-outlined text-primary text-sm">wifi</span>
					<span class="text-muted font-retrogm hidden text-xs sm:block">CONNECTED</span>
				</div>
				<div class="flex items-center gap-2">
					<a
						href="mailto:devsoham3@gmail.com"
						class="text-primary hover:text-foreground flex items-center justify-center p-2 transition-colors"
						title="Email"
					>
						<span class="material-symbols-outlined text-lg">mail</span>
					</a>
					<a
						href="https://linkedin.com/in/devsoham3"
						target="_blank"
						class="text-secondary hover:text-foreground flex items-center justify-center p-2 transition-colors"
						title="LinkedIn"
					>
						<span class="material-symbols-outlined text-lg">link</span>
					</a>
					<a
						href="https://github.com/devSoham3"
						target="_blank"
						class="text-accent hover:text-foreground flex items-center justify-center p-2 transition-colors"
						title="GitHub"
					>
						<span class="material-symbols-outlined text-lg">code</span>
					</a>
				</div>
			</div>
		{/if}
	</footer>
</div>

<style>
	/* Animated loading dots */
	.loading-dots::after {
		content: '';
		animation: dots 1.5s steps(4, end) infinite;
	}

	@keyframes dots {
		0% {
			content: '';
		}
		25% {
			content: '.';
		}
		50% {
			content: '..';
		}
		75% {
			content: '...';
		}
		100% {
			content: '';
		}
	}

	/* Retro block loading bar */
	.loading-block {
		background: #1a2a30;
		border: 1px solid #233f48;
	}

	.loading-block.active {
		background: #13b6ec;
		border-color: #13b6ec;
		box-shadow: 0 0 8px rgba(19, 182, 236, 0.6);
	}

	/* Vertical marquee animations */
	.marquee-content-left {
		animation: scrollUp 20s linear infinite;
	}

	.marquee-content-right {
		animation: scrollDown 25s linear infinite;
	}

	@keyframes scrollUp {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-50%);
		}
	}

	@keyframes scrollDown {
		0% {
			transform: translateY(-50%) rotate(180deg);
		}
		100% {
			transform: translateY(0) rotate(180deg);
		}
	}
</style>
