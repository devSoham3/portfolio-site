<script>
	import { onMount } from 'svelte';
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

<section id="projects" class="bg-background mb-16 min-h-screen rounded-lg p-6">
	{#if error}
		<p>Error loading data.</p>
	{:else if projectData}
		<!-- Projects -->
		<div class="bg-surface border-rblue mb-16 rounded-4xl border-4 p-6">
			<h2 class="font-prsst text-ryllw mb-6 text-center text-3xl font-bold">Projects</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{#each projectData.projects as project}
					<div class="bg-background border-rblue rounded-3xl border-2 p-6 shadow">
						<h4 class="font-retrogm text-rpink mb-2 text-xl font-semibold">{project.name}</h4>
						<div class="bg-surface rounded-lg">
							{#each project.description as desc}
								<p class="text-foreground font-pixelopt text-lg font-semibold">{desc}</p>
							{/each}

							<h4 class="text-md font-retrogm text-rpink mt-4 mb-2 font-semibold">Skillset</h4>
							{#each project.skillset as skill}
								<p class="text-rorng text-md font-pixelopt font-semibold">- {skill}</p>
							{/each}

							<h4 class="text-md font-retrogm text-rpink mt-4 mb-2 font-semibold">Objectives</h4>
							{#each project.objectives as objv}
								<p class="text-foreground text-md font-pixelopt font-semibold">- {objv}</p>
							{/each}

							{#if project.results.length > 0}
								<h4 class="text-md font-retrogm text-rpink mt-4 mb-2 font-semibold">Results</h4>
								{#each project.results as res}
									<p class="text-foreground text-md font-pixelopt font-semibold">- {res}</p>
								{/each}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
