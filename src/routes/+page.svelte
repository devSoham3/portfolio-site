<script>
// Import your component sections
import About from '$lib/About.svelte';
import Highlights from '$lib/Highlights.svelte';
// import CV from '$lib/CV.svelte';
import Projects from '$lib/Projects.svelte';
</script>

<!-- Main container for entire page -->
<div class="bg-background">
    <div class="container mx-auto max-w-5xl px-4 text-foreground">
        <nav class="mb-8 sticky top-0 bg-surface z-10 shadow-sm text-foreground">
            <ul class="flex justify-end space-x-6 py-4">
                <li><a href="#about" class="font-retrogm hover:text-rblue">About</a></li>
                <li>|</li>
                <li><a href="#highlights" class="font-retrogm hover:text-rblue">Highlights</a></li>
                <li>|</li>
                <li><a href="#projects" class="font-retrogm hover:text-rblue">Projects</a></li>
            </ul>
        </nav>

        <About />
        <Highlights />
        <Projects />
    </div>
</div>

<style></style>
