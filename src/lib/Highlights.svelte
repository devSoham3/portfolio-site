<script>
import {
    onMount
} from 'svelte';
let highlightData = null;
let error = null;

onMount(async () => {
    try {
        const res = await fetch('/data/highlights.json');
        highlightData = await res.json();
    } catch (err) {
        error = err;
    }
});
</script>

<section id="highlights" class="mb-16 p-6 bg-surface rounded-lg text-foreground">
    {#if error}
    <p class="text-danger">Error loading data.</p>
    {:else}
    {#if highlightData}
    <!-- Highlights Section -->
    <div class="mb-16 p-6 bg-surface rounded-lg border border-border">
        <h2 class="text-3xl font-bold mb-6 text-center text-accent">Highlights</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {#each highlightData.skills as skill}
            <div class="p-6 bg-background rounded-lg border border-border shadow">
                <h4 class="font-semibold text-primary-light mb-2">{skill.category}</h4>
                <div class="p-2 bg-surface rounded-lg">
                    {#each skill.items as item}
                    <p class="text-foreground">{item}</p>
                    {/each}
                </div>
            </div>
            {/each}
        </div>
    </div>
    {/if}
    {/if}
</section>
