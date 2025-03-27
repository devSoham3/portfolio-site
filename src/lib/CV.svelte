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

<section id= "cv" class="mb-16 p-6 bg-gray-100 rounded-lg">
    {#if error}
    <p>Error loading data.</p>
    {:else}
    {#if cvData}
    <!-- Experience -->
    <div class="mb-16 p-6 bg-gray-200 rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center">Experience</h2>
    </div>
    <!-- Education -->
    <div class="mb-16 p-6 bg-gray-200 rounded-lg">
        <h2 class="text-3xl font-bold mb-6 text-center">Education</h2>
        <div class="text-center md:text-left">
            {#each cvData.education as edu}
            <h3 class="text-2xl font-semibold">{edu.institution}</h3>
            <p>{edu.degree} ({edu.duration})</p>
            <p>GPA: {edu.gpa}</p>
            <p class="text-gray-700 mb-4 text-justify">Coursework: {edu.coursework.join(', ')}</p>
            {/each}
        </div>
    </div>
    {/if}
    {/if}
</section>
