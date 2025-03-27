<script>
  // Import your component sections
  import About from '$lib/About.svelte';
  import CV from '$lib/CV.svelte';
  import Highlights from '$lib/Highlights.svelte';
  import Projects from '$lib/Projects.svelte';
</script>

<!-- Main container for entire page -->
<div class="container mx-auto max-w-4xl px-4 py-8">
  <!-- Navigation menu -->
  <nav class="mb-8 sticky top-0 bg-white z-10 shadow-sm">
    <ul class="flex justify-center space-x-6 py-4">
      <li><a href="#about" class="hover:text-blue-500">About</a></li>
      <li><a href="#cv" class="hover:text-blue-500">CV</a></li>
      <li><a href="#highlights" class="hover:text-blue-500">Highlights</a></li>
      <li><a href="#projects" class="hover:text-blue-500">Projects</a></li>
    </ul>
  </nav>

  <!-- Each section component -->
  <About />
  <CV />
  <Highlights />
  <Projects />
</div>

<style>
  /* Smooth scrolling for anchor links */
  /* html {
    scroll-behavior: smooth;
  } */
</style>