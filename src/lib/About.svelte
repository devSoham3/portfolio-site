<script>
import {
    onMount
} from 'svelte';
let aboutData = null;
let error = null;

onMount(async () => {
    try {
        const res = await fetch('/data/about.json');
        aboutData = await res.json();
    } catch (err) {
        error = err;
    }
});
</script>

<section id="about" class="mb-16 p-6 bg-gray-100 rounded-lg">
    {#if error}
    <p>Error loading data.</p>
    {:else}
    {#if aboutData}
    <h2 class="text-4xl font-bold mb-6">Get to know me...</h2>
    <h3 class="text-2xl font-semibold text-center">
        I am a graduate student from Rochester Institute of Technology, starting my career in data science & engineering.
    </h3>
    <div class="flex flex-col md:flex-row items-center">
        <img
            src={aboutData.photo}
            alt={`Photo of ${aboutData.name}`}
            class="w-48 h-48 rounded-full object-cover mb-4 md:mr-8" />
        <div class="py-3 text-left">
            {#each aboutData.description as desc_para}
            <p class="text-gray-1000 mb-4 text-justify">{desc_para}</p>
            {/each}
        </div>
    </div>
    {:else}
    <!-- Skeleton Loader / Placeholder Content -->
    <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-gray-300 h-48 w-48"></div>
        <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            <div class="space-y-2">
                <div class="h-4 bg-gray-300 rounded"></div>
                <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
        </div>
    </div>
    {/if}
    {/if}
</section>
