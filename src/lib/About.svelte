<script>
	import { onMount } from 'svelte';
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

<section id="about" class="bg-surface text-foreground mb-16 min-h-screen rounded-lg p-6">
	{#if error}
		<p class="text-danger">Error loading data.</p>
	{:else if aboutData}
		<!-- <h2 class="text-4xl font-bold mb-6 text-accent">Hey, I'm Soham!</h2> -->
		<div
			class="bg-background border-rblue mt-6 flex flex-col items-center rounded-4xl border-4 p-4 md:flex-row"
		>
			<img
				src={aboutData.photo}
				alt={`Photo of ${aboutData.name}`}
				class="border-rblue m-4 h-100 w-100 rounded-full border-4 object-cover md:mr-8"
			/>
			<div class="mr-4 py-3 text-left">
				<h2 class="font-prsst text-ryllw mb-6 text-3xl hover:animate-pulse">Hey, I'm Soham!</h2>
				<h3 class="font-retrogm text-rorng text-lg">
					I am a software engineer with experience in databases, research in software quality, and a
					passion for building reliable, data-driven systems.
				</h3>
				<div class="mt-4">
					{#each aboutData.description as desc_para}
						<p class="font-pixelopt text-foreground mb-4 text-justify font-semibold">{desc_para}</p>
					{/each}
				</div>
				<div></div>
			</div>
		</div>
	{:else}
		<!-- Skeleton Loader -->
		<div
			class="bg-background border-rblue flex h-125 animate-pulse flex-col gap-10 rounded-4xl border-4 p-6 md:flex-row"
		>
			<!-- Circular Image Placeholder -->
			<div class="flex-shrink-0 self-center md:self-start">
				<div class="bg-rblue mt-10 mb-20 h-90 w-80 rounded-full"></div>
			</div>

			<!-- Text Placeholder -->
			<div class="flex-1 py-2">
				<!-- Heading -->
				<div class="bg-ryllw mt-12 h-10 w-4/5 rounded"></div>
				<!-- Orange lines -->
				<div class="space-y-2">
					<div class="bg-rorng mt-10 h-4 w-full rounded"></div>
					<div class="bg-rorng h-4 w-full rounded"></div>
					<div class="bg-rorng h-4 w-full rounded"></div>
					<!-- Extra Points -->
					<div class="bg-muted mt-10 h-4 w-full rounded"></div>
					<div class="bg-muted mt-10 h-4 w-full rounded"></div>
					<div class="bg-muted mt-10 h-4 w-full rounded"></div>
				</div>
			</div>
		</div>
	{/if}
</section>
