<script>
	// Import your component sections
	import About from '$lib/About.svelte';
	import Highlights from '$lib/Highlights.svelte';
	import CV from '$lib/CV.svelte';
	import Projects from '$lib/Projects.svelte';

	// transitions
	import { fade, fly, slide } from 'svelte/transition';

	// use a current section to display only selected tab
	let currentSection = 'about';

	function navigateTo(section) {
		currentSection = section;
	}
</script>

<!-- Main container for entire page -->
<div class="bg-background">
	<div class="text-foreground container mx-auto max-w-5xl px-4">
		<nav class="bg-surface text-foreground sticky top-0 z-10 mb-8 shadow-sm">
			<ul class="flex justify-end space-x-6 py-4">
				<li>
					<button on:click={() => navigateTo('about')} class="font-retrogm hover:text-rblue">
						About
					</button>
				</li>
				<li>|</li>
				<li>
					<button on:click={() => navigateTo('highlights')} class="font-retrogm hover:text-rblue">
						Highlights
					</button>
				</li>
				<li>|</li>
				<li>
					<button on:click={() => navigateTo('projects')} class="font-retrogm hover:text-rblue">
						Projects
					</button>
				</li>
				<li>|</li>
				<li>
					<button on:click={() => navigateTo('cv')} class="font-retrogm hover:text-rblue">
						Curriculum Vitae
					</button>
				</li>
			</ul>
		</nav>

		{#if currentSection === 'about'}
			<div in:slide out:slide>
				<About />
			</div>
		{:else if currentSection === 'highlights'}
			<div in:slide out:slide>
				<Highlights />
			</div>
		{:else if currentSection === 'projects'}
			<div in:slide out:slide>
				<Projects />
			</div>
		{:else if currentSection === 'cv'}
			<div in:slide out:slide>
				<CV />
			</div>
		{/if}
	</div>

	<!-- Footer -->
	<footer class="bg-surface text-foreground mt-8 py-4 sticky bottom-0">
		<div class="container mx-auto max-w-5xl px-4 text-center">
			<p class="font-prsst text-ryllw">Contact Me:</p>
			<ul class="mt-2 flex justify-center space-x-6">
				<li>
					<a href="mailto:devsoham3@gmail.com" class="hover:text-rblue font-retrogm">
						devsoham3@gmail.com
					</a>
				</li>
				<li>|</li>
				<li>
					<a href="https://linkedin.com/in/devsoham3" target="_blank" class="hover:text-rblue font-retrogm">
						LinkedIn
					</a>
				</li>
				<li>|</li>
				<li>
					<a href="https://github.com/devSoham3" target="_blank" class="hover:text-rblue font-retrogm">
						GitHub	
					</a>
				</li>
			</ul>
		</div>
	</footer>
</div>

<style></style>
