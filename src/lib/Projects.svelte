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

<section id="projects" class="mb-16 p-6 bg-background rounded-lg">
    {#if error}
    <p>Error loading data.</p>
    {:else}
    {#if projectData}
    <!-- Projects -->
    <div class="mb-16 p-6 bg-surface rounded-4xl border-4 border-rblue">
        <h2 class="text-3xl font-prsst text-ryllw font-bold mb-6 text-center">Projects</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {#each projectData.projects as project}
            <div class="p-6 bg-background rounded-3xl border-2 border-rblue shadow">
                <h4 class="text-xl font-semibold font-retrogm text-rpink mb-2">{project.name}</h4>
                <div class="bg-surface rounded-lg">
                    {#each project.description as desc}
                    <p class="text-foreground font-semibold text-lg font-pixelopt">{desc}</p>
                    {/each}
                    
                    <h4 class="mt-4 text-md font-semibold font-retrogm text-rpink mb-2">Skillset</h4>
                    {#each project.skillset as skill}
                    <p class="text-rorng font-semibold text-md font-pixelopt">- {skill}</p>
                    {/each}

                    <h4 class="mt-4 text-md font-semibold font-retrogm text-rpink mb-2">Objectives</h4>
                    {#each project.objectives as objv}
                    <p class="text-foreground font-semibold text-md font-pixelopt">- {objv}</p>
                    {/each}
                    
                    {#if project.results.length > 0}
                    <h4 class="mt-4 text-md font-semibold font-retrogm text-rpink mb-2">Results</h4>
                    {#each project.results as res}
                    <p class="text-foreground font-semibold text-md font-pixelopt">- {res}</p>
                    {/each}
                    {/if}
                </div>
            </div>
            {/each}
        </div>
    </div>
    {/if}
    {/if}
</section>
