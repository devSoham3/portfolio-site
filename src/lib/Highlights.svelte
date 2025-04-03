<script>
	import { onMount } from 'svelte';
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

<section id="highlights" class="bg-surface text-foreground mb-16 min-h-screen rounded-lg p-6">
	{#if error}
		<p class="text-danger">Error loading data.</p>
	{:else if highlightData}
		<!-- Highlights Section -->
		<div class="bg-surface border-rblue mb-16 rounded-4xl border-4 p-6">
			<h2 class="font-prsst text-ryllw mb-6 text-center text-2xl">Highlights</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				{#each highlightData.skills as skill}
					<div class="bg-background border-rblue rounded-3xl border-2 p-6 shadow">
						<h4 class="font-retrogm text-rpink mb-2 text-xl font-semibold">{skill.category}</h4>
						<div class="bg-surface rounded-lg">
							{#each skill.items as item}
								<p class="text-foreground font-pixelopt text-lg font-semibold">{item}</p>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- TODO: write the skeleton -->
		<!-- outer box -->
		<div class="bg-surface border-rblue mb-16 rounded-4xl border-4 p-6">
			<div class="bg-ryllw mb-5 ml-80 h-10 w-60 self-center rounded"></div>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				<div class="bg-background border-rblue rounded-3xl border-2 p-6 shadow">
					<div class="bg-rpink mb-5 h-10 w-45 self-center rounded"></div>
				</div>
				<div class="bg-background border-rblue rounded-3xl border-2 p-6 shadow">
					<div class="bg-rpink mb-5 h-10 w-45 self-center rounded"></div>
				</div>
				<div class="bg-background border-rblue rounded-3xl border-2 p-6 shadow">
					<div class="bg-rpink mb-5 h-10 w-45 self-center rounded"></div>
				</div>
			</div>
		</div>
	{/if}
</section>
