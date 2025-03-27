<script>
import {
    onMount
} from 'svelte';
let projectData = null;
let error = null;

onMount(async () => {
    try {
        const res = await fetch('/data/projects.json');
        projectData = await res.json();
    } catch (err) {
        error = err;
    }
});
</script>

<section id="about" class="mb-16 p-6 bg-gray-100 rounded-lg">
    {#if error}
    <p>Error loading data.</p>
    {:else}
    {#if projectData}
    <!-- Projects -->
    <div class="mb-16 p-6 bg-gray-200 rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center">Projects</h2>
    </div>
    {/if}
    {/if}
</section>
