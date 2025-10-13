<script lang="ts">
	import { GithubIcon, StarIcon, BookOpenIcon } from 'lucide-svelte';
</script>

<div class="flex flex-col gap-6">
	<div class="hero rounded-box bg-base-200">
		<div class="hero-content text-center">
			<div class="max-w-xl">
				<h1 class="text-3xl font-bold">Source Code</h1>
				<p class="py-4 text-base-content/80">
					I love building in the open. Explore the codebase behind this website, learn from it,
					suggest improvements, or use parts of it in your own projects. Contributions are welcome.
				</p>
				<div class="flex flex-wrap items-center justify-center gap-3">
					<a
						target="_blank"
						href="https://github.com/nijasc/nilsschlegel.dev"
						class="btn gap-2 btn-primary"
					>
						<GithubIcon size={18} />
						<span>View on GitHub</span>
					</a>
					<a
						target="_blank"
						href="https://github.com/nijasc/nilsschlegel.dev/stargazers"
						class="btn gap-2 btn-outline"
					>
						<StarIcon size={18} />
						<span>Star the Repo</span>
					</a>
					<a
						target="_blank"
						href="https://github.com/nijasc/nilsschlegel.dev#readme"
						class="btn gap-2 btn-ghost"
					>
						<BookOpenIcon size={18} />
						<span>Read the README</span>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="stats stats-vertical bg-base-100 shadow sm:stats-horizontal">
		<div class="stat">
			<div class="stat-title">Tech Stack</div>
			<div class="stat-value text-2xl text-primary">Svelte</div>
			<div class="stat-desc">Modern, fast, and minimal</div>
		</div>
		<div class="stat">
			<div class="stat-title">License</div>
			<div class="stat-value text-2xl text-secondary">MIT</div>
			<div class="stat-desc">Open and permissive</div>
		</div>
		<div class="stat">
			<div class="stat-title">Issues & Ideas</div>
			<div class="stat-value text-2xl text-accent">Contribute</div>
			<div class="stat-desc">PRs are encouraged</div>
		</div>
	</div>

	<div class="card bg-base-100 shadow">
		<div class="card-body">
			<h2 class="card-title">What you?ll find</h2>
			<ul class="ml-5 list-disc space-y-1 text-base-content/80">
				<li>Reusable UI components styled with Tailwind and daisyUI</li>
				<li>Project structure and patterns for clean Svelte apps</li>
				<li>Config, scripts, and tooling for a smooth DX</li>
				<li>Examples for accessibility and responsive design</li>
			</ul>
			<div class="card-actions justify-end">
				<a
					target="_blank"
					href="https://github.com/nijasc/nilsschlegel.dev"
					class="btn btn-primary"
				>
					<GithubIcon size={18} />
					<span>Browse Repository</span>
				</a>
			</div>
		</div>
	</div>
</div>
