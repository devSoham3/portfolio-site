<script>
import {
    onMount
} from 'svelte';
let cvData = null;
let error = null;

onMount(async () => {
    try {
        const res = await fetch('/data/cv.json');
        cvData = await res.json();
    } catch (err) {
        error = err;
    }
});
</script>

<section id= "cv" class="mb-16 p-6 bg-surface rounded-lg text-foreground min-h-screen">
    {#if error}
    <p>Error loading data.</p>
    {:else}
    {#if cvData}
    <!-- Experience -->
    <div class="mb-16 p-6 bg-surface rounded-4xl border-4 border-rblue">
        <h2 class="text-2xl font-prsst mb-6 text-center text-ryllw">Curriculum Vitae</h2>

        <h3 class="text-xl font-retrogm mb-6 text-center text-rorng">Experience</h3>
        <!-- Work -->
        <div class="mb-16 p-6 bg-surface rounded-4xl border-2 border-rblue">
            {#each cvData.experience.work as expr}
            <h4 class="text-2xl font-retrogm">{expr.role} @ {expr.organization}</h4>
            <p class="font-pixelopt">{expr.duration}, {expr.location}</p>
            {#each expr.responsibilities as resp}
            <p class="font-pixelopt mb-4 text-justify">- {resp}</p>
            {/each}
            {/each}
        </div>
        <!-- Research -->
        <div class="mb-16 p-6 bg-surface rounded-4xl border-2 border-rblue">
            {#each cvData.experience.research as expr}
            <h4 class="text-2xl font-retrogm">{expr.role} @ {expr.organization}</h4>
            <p class="font-pixelopt">{expr.duration}, {expr.location}</p>
            {#if Array.isArray(expr.responsibilities)}
                {#each expr.responsibilities as resp}
                <p class="font-pixelopt mb-4 text-justify">- {resp}</p>
                {/each}
            {:else}
                <p class="font-pixelopt mb-4 text-justify">- {expr.responsibilities}</p>
            {/if}
            {/each}
        </div>
        <!-- Teaching -->
        <div class="mb-16 p-6 bg-surface rounded-4xl border-2 border-rblue">
            {#each cvData.experience.teaching as expr}
            <h4 class="text-2xl font-retrogm">{expr.role} @ {expr.organization}</h4>
            <p class="font-pixelopt">{expr.duration}, {expr.location}</p>
            {#if Array.isArray(expr.responsibilities)}
                {#each expr.responsibilities as resp}
                <p class="font-pixelopt mb-4 text-justify">- {resp}</p>
                {/each}
            {:else}
                <p class="font-pixelopt mb-4 text-justify">- {expr.responsibilities}</p>
            {/if}
            {/each}
        </div>
    <!-- Education -->
    <div class="mb-16 p-6 bg-surface rounded-4xl border-2 border-rblue">
        <h3 class="text-2xl font-bold mb-6 text-center">Education</h3>
        <div class="text-center md:text-left">
            {#each cvData.education as edu}
            <h4 class="text-2xl font-retrogm">{edu.institution}</h4>
            <p class="font-pixelopt mb-4 text-justify">{edu.degree} ({edu.duration})</p>
            <p class="font-pixelopt mb-4 text-justify">GPA: {edu.gpa}</p>
            <p class="font-pixelopt mb-4 text-justify">Coursework: {edu.coursework.join(', ')}</p>
            {/each}
        </div>
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
