<script lang="ts">
	import portrait from '$lib/assets/favicon.svg';
</script>

<div class="flex min-h-screen w-full items-center justify-center">
	<div class="flex h-full w-full max-w-6xl items-center justify-between flex-col md:flex-row">
		<div class="card max-w-xl bg-base-100 shadow-md p-10 md:p-12">
			<h1 class="text-3xl font-semibold">About Me</h1>
			<div class="mt-2 h-1 w-24 rounded-full bg-primary"></div>

			<div class="mt-6 space-y-4">
				<p class="text-lg leading-relaxed text-base-content/80">
					Hi, I'm Nils Schlegel, an apprentice software developer in my third
					year at Abacus Research AG. I specialize in Kotlin and Java, building
					backend services with Spring Boot and the custom Abacus framework.
				</p>
				<p class="text-lg leading-relaxed text-base-content/80">
					I enjoy crafting clean, reliable APIs, collaborating across teams, and
					turning complex requirements into maintainable solutions.
				</p>
			</div>

			<div class="mt-6 flex flex-wrap gap-2">
				<span class="badge badge-primary badge-outline">Kotlin</span>
				<span class="badge badge-secondary badge-outline">Java</span>
				<span class="badge badge-accent badge-outline">Spring Boot</span>
				<span class="badge badge-warning badge-outline">APIs</span>
			</div>
		</div>

		<div class="flex items-center justify-center p-10 md:p-12">
			<div class="avatar">
				<div class="w-40 md:w-64 rounded-xl ring ring-primary ring-offset-2 ring-offset-base-100">
					<img src={portrait} alt="Portrait of Nils Schlegel" />
				</div>
			</div>
		</div>
	</div>
</div>