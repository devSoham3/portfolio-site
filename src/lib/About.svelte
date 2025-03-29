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
    <!-- <h2 class="text-4xl font-bold mb-6 text-accent">Hey, I'm Soham!</h2> -->
    <div class="bg-background rounded-4xl mt-6 flex flex-col md:flex-row items-center p-4 border-4 border-rblue">
        <img
            src={aboutData.photo}
            alt={`Photo of ${aboutData.name}`}
            class="w-100 h-100 rounded-full object-cover m-4 md:mr-8 border-4 border-rblue" />
        <div class="py-3 text-left mr-4">
            <h2 class="text-3xl font-prsst mb-6 text-ryllw hover:animate-pulse">Hey, I'm Soham!</h2>
            <h3 class="text-lg font-retrogm text-rorng">
                I am a software engineer with experience in databases, research in software quality, and a passion for building reliable, data-driven systems.
            </h3>
            <div class="mt-4">
                {#each aboutData.description as desc_para}
                <p class="mb-4 text-justify font-semibold font-pixelopt text-foreground">{desc_para}</p>
                {/each}
            </div>
            <div>

            </div>
        </div>
    </div>
    {:else}
    <!-- Skeleton Loader -->
    <div class="animate-pulse flex flex-col md:flex-row gap-10 p-6 bg-background border-4 border-rblue rounded-4xl h-125">
        <!-- Circular Image Placeholder -->
        <div class="flex-shrink-0 self-center md:self-start">
            <div class="rounded-full bg-rblue h-90 w-80 mb-20 mt-10"></div>
        </div>

        <!-- Text Placeholder -->
        <div class="flex-1 py-2">
            <!-- Heading -->
            <div class="h-10 bg-ryllw rounded w-4/5 mt-12"></div>
            <!-- Orange lines -->
            <div class="space-y-2">
                <div class="h-4 bg-rorng rounded w-full mt-10"></div>
                <div class="h-4 bg-rorng rounded w-full"></div>
                <div class="h-4 bg-rorng rounded w-full"></div>
                <!-- Extra Points -->
                <div class="h-4 bg-muted rounded w-full mt-10"></div>
                <div class="h-4 bg-muted rounded w-full mt-10"></div>
                <div class="h-4 bg-muted rounded w-full mt-10"></div>
            </div>
        </div>
    </div>
    {/if}
    {/if}
</section>
