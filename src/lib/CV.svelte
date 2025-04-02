<script>
	import { onMount } from 'svelte';
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

<section id="cv" class="bg-surface text-foreground mb-16 min-h-screen rounded-lg p-6">
	{#if error}
		<p>Error loading data.</p>
	{:else if cvData}
		<!-- Experience -->
		<div class="bg-surface border-rblue mb-16 rounded-4xl border-4 p-6">
			<h2 class="font-prsst text-ryllw mb-6 text-center text-2xl">Curriculum Vitae</h2>

			<h3 class="font-retrogm text-rorng mb-6 text-center text-3xl">Experience</h3>
			<!-- Work -->
			<div class="bg-surface border-rblue mb-16 rounded-4xl border-2 p-6">
				{#each cvData.experience.work as org}
					{#each org.roles as role}
						<h4 class="font-retrogm text-2xl">
							<span class="text-rpink font-prsst text-2xl">{role.role}</span> @ {org.organization}
						</h4>
						<p class="font-pixelopt">
							{role.duration}
							{#if org.location}@ {org.location}{/if}
						</p>
						{#if Array.isArray(role.responsibilities)}
							{#each role.responsibilities as resp}
								<p class="text-sm font-pixellari font-thin mb-4 text-justify">- {resp}</p>
							{/each}
						{:else}
							<p class="text-sm font-pixellari font-thin mb-4 text-justify">{role.responsibilities}</p>
						{/if}
					{/each}
				{/each}
			</div>

			<!-- Academia -->
			<div class="bg-surface border-rblue mb-16 rounded-4xl border-2 p-6">
				{#each cvData.experience.academia as org}
					<h3 class="font-retrogm mb-4 text-3xl">{org.organization}</h3>
					{#if org.location}
						<p class="font-pixelopt mb-4">@ {org.location}</p>
					{/if}
					{#each org.roles as role}
						<h4 class="font-retrogm text-rpink mt-6 text-2xl">{role.role}</h4>
						<p class="font-pixelopt">
							{role.duration}
						</p>
						{#if Array.isArray(role.responsibilities)}
							{#each role.responsibilities as resp}
								<p class="text-sm font-pixellari font-thin mb-4 text-justify">- {resp}</p>
							{/each}
						{:else}
							<p class="text-sm font-pixellari font-thin mb-4 text-justify">{role.responsibilities}</p>
						{/if}
					{/each}
				{/each}
			</div>

			<!-- Education -->
			<div class="bg-surface border-rblue mb-16 rounded-4xl border-2 p-6">
				<h3 class="font-retrogm text-rorng mb-6 text-center text-3xl">Education</h3>
				<div class="text-center md:text-left">
					{#each cvData.education as edu}
						<h4 class="font-retrogm">{edu.institution}</h4>
						<p class="font-retrogm mb-4 text-2xl">{edu.degree}</p>
						<p class="font-pixelopt mb-4 text-justify">{edu.duration}, GPA: <span class="font-prsst">{edu.gpa}</span></p>
						<!-- <p class="font-pixelopt mb-4 text-justify"></p> -->
						<p class="text-sm font-pixellari font-thin mb-4 text-justify">Coursework: {edu.coursework.join(', ')}</p>
					{/each}
				</div>
			</div>
		</div>
	{:else}
		<!-- Skeleton Loader / Placeholder Content -->
		<div class="flex animate-pulse space-x-4">
			<div class="h-48 w-48 rounded-full bg-gray-300"></div>
			<div class="flex-1 space-y-4 py-1">
				<div class="h-4 w-3/4 rounded bg-gray-300"></div>
				<div class="space-y-2">
					<div class="h-4 rounded bg-gray-300"></div>
					<div class="h-4 w-5/6 rounded bg-gray-300"></div>
				</div>
			</div>
		</div>
	{/if}
</section>
