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

<section id="highlights" class="mb-16 p-6 bg-surface rounded-lg text-foreground min-h-screen">
    {#if error}
    <p class="text-danger">Error loading data.</p>
    {:else}
    {#if highlightData}
    <!-- Highlights Section -->
    <div class="mb-16 p-6 bg-surface rounded-4xl border-4 border-rblue">
        <h2 class="text-2xl font-prsst mb-6 text-center text-ryllw">Highlights</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {#each highlightData.skills as skill}
            <div class="p-6 bg-background rounded-3xl border-2 border-rblue shadow">
                <h4 class="text-xl font-semibold font-retrogm text-rpink mb-2">{skill.category}</h4>
                <div class="bg-surface rounded-lg">
                    {#each skill.items as item}
                    <p class="text-foreground font-semibold text-lg font-pixelopt">{item}</p>
                    {/each}
                </div>
            </div>
            {/each}
        </div>
    </div>
    {:else}
    <!-- TODO: write the skeleton -->
    <!-- outer box -->
    <div class="mb-16 p-6 bg-surface rounded-4xl border-4 border-rblue">
        <div class="h-10 bg-ryllw rounded w-60 ml-80 mb-5 self-center"></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div class="p-6 bg-background rounded-3xl border-2 border-rblue shadow">
                <div class="h-10 bg-rpink rounded w-45 mb-5 self-center"></div>
            </div>
            <div class="p-6 bg-background rounded-3xl border-2 border-rblue shadow">
                <div class="h-10 bg-rpink rounded w-45 mb-5 self-center"></div>
            </div>
            <div class="p-6 bg-background rounded-3xl border-2 border-rblue shadow">
                <div class="h-10 bg-rpink rounded w-45 mb-5 self-center"></div>
            </div>
            
        </div>
    </div>
    {/if}
    {/if}
</section>
