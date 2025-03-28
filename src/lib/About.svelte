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

<section id="about" class="mb-16 p-6 bg-surface rounded-lg text-foreground">
    {#if error}
    <p class="text-danger">Error loading data.</p>
    {:else}
    {#if aboutData}
    <h2 class="text-4xl font-bold mb-6 text-accent text-center">Get to know me...</h2>
    <h3 class="text-2xl font-semibold text-center text-foreground">
        I am a graduate student from Rochester Institute of Technology, starting my career in data science & engineering.
    </h3>
    <div class="bg-background rounded-lg mt-6 flex flex-col md:flex-row items-center p-4 border border-border">
        <img
            src={aboutData.photo}
            alt={`Photo of ${aboutData.name}`}
            class="w-150 h-100 rounded-full object-cover mb-4 md:mr-8" />
        <div class="py-3 text-left">
            {#each aboutData.description as desc_para}
            <p class="mb-4 text-justify text-muted">{desc_para}</p>
            {/each}
        </div>
    </div>
    {:else}
    <div class="animate-pulse flex space-x-4">
        <div class="rounded-full bg-muted h-48 w-48"></div>
        <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-muted rounded w-3/4"></div>
            <div class="space-y-2">
                <div class="h-4 bg-muted rounded"></div>
                <div class="h-4 bg-muted rounded w-5/6"></div>
            </div>
        </div>
    </div>
    {/if}
    {/if}
</section>
