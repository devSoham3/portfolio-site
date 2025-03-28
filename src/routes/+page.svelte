<script>
// Import your component sections
import About from '$lib/About.svelte';
import Highlights from '$lib/Highlights.svelte';
// import CV from '$lib/CV.svelte';
// import Projects from '$lib/Projects.svelte';
</script>

<!-- Main container for entire page -->
<div class="bg-background">
    <div class="container mx-auto max-w-4xl px-4 py-8 text-foreground">
        <nav class="mb-8 sticky top-0 bg-surface z-10 shadow-sm text-foreground text-right">
            <ul class="flex justify-center space-x-6 py-4">
                <li><a href="#about" class="hover:text-primary-light">About</a></li>
                <li><a href="#highlights" class="hover:text-primary-light">Highlights</a></li>
            </ul>
        </nav>

        <About />
        <Highlights />
    </div>
</div>

<style>
:global(html) {
    scroll-behavior: smooth;
}
</style>
