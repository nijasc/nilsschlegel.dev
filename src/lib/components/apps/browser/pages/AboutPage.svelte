<script lang="ts">
	import portrait from '$lib/assets/favicon.svg';

	const skills = ['Kotlin', 'Java', 'Spring Boot', 'REST APIs'];
</script>

<div class="flex min-h-full w-full items-center justify-center px-6 py-16">
	<div class="grid w-full max-w-5xl gap-16 md:grid-cols-[1fr_auto]">
		<div class="flex flex-col justify-center gap-8">
			<div>
				<p class="mb-2 text-sm font-medium tracking-widest text-primary uppercase">
					Software Developer
				</p>
				<h1 class="text-4xl font-bold tracking-tight text-base-content">Nils Schlegel</h1>
			</div>

			<div class="space-y-4 border-l-2 border-base-300 pl-5">
				<p class="leading-relaxed text-base-content/70">
					Third-year apprentice at <span class="font-medium text-base-content"
						>Abacus Research AG</span
					>, building backend services with Spring Boot and the custom Abacus framework.
				</p>
				<p class="leading-relaxed text-base-content/70">
					I focus on clean APIs, cross-team collaboration, and turning complex requirements into
					maintainable solutions.
				</p>
			</div>

			<div class="flex flex-wrap gap-2">
				{#each skills as skill}
					<span
						class="rounded-lg border border-base-300 bg-base-200 px-3 py-1 text-sm font-medium text-base-content/80"
					>
						{skill}
					</span>
				{/each}
			</div>
		</div>

		<div class="flex items-center justify-center">
			<div class="relative">
				<div
					class="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 blur-lg"
				></div>
				<div class="avatar relative">
					<div class="w-48 overflow-hidden rounded-2xl md:w-56">
						<img src={portrait} alt="Portrait of Nils Schlegel" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
