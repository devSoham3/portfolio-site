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
				<!-- basic links -->
				<!-- <li><a href="#about" class="font-retrogm hover:text-rblue">About</a></li>
                <li>|</li>
                <li><a href="#highlights" class="font-retrogm hover:text-rblue">Highlights</a></li>
                <li>|</li>
                <li><a href="#projects" class="font-retrogm hover:text-rblue">Projects</a></li> -->

				<!-- transistioned -->
				<li>
					<button on:click={() => navigateTo('about')} class="font-retrogm hover:text-rblue"
						>About</button
					>
				</li>
				<li>|</li>
				<li>
					<button on:click={() => navigateTo('highlights')} class="font-retrogm hover:text-rblue"
						>Highlights</button
					>
				</li>
				<li>|</li>
				<li>
					<button on:click={() => navigateTo('projects')} class="font-retrogm hover:text-rblue"
						>Projects</button
					>
				</li>
				<li>|</li>
				<li>
					<button on:click={() => navigateTo('cv')} class="font-retrogm hover:text-rblue"
						>Curriculum Vitae</button
					>
				</li>
			</ul>
		</nav>

		<!-- Use switch cases instead? -->
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
</div>

<style></style>
