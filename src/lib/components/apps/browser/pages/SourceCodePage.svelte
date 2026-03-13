<script lang="ts">
	import { Github, Star, BookOpen } from 'lucide-svelte';

	const stats = [
		{
			title: 'Tech Stack',
			value: 'Svelte',
			desc: 'Modern, fast, and minimal',
			color: 'text-primary'
		},
		{ title: 'License', value: 'MIT', desc: 'Open and permissive', color: 'text-secondary' },
		{ title: 'Contribute', value: 'PRs', desc: 'Issues and ideas welcome', color: 'text-accent' }
	];

	const highlights = [
		'Reusable UI components styled with Tailwind and daisyUI',
		'Project structure and patterns for clean Svelte apps',
		'Config, scripts, and tooling for a smooth DX',
		'Examples for accessibility and responsive design'
	];

	const actions = [
		{
			href: 'https://github.com/nijasc/nilsschlegel.dev',
			icon: Github,
			label: 'View on GitHub',
			style: 'btn-primary'
		},
		{
			href: 'https://github.com/nijasc/nilsschlegel.dev/stargazers',
			icon: Star,
			label: 'Star the Repo',
			style: 'btn-outline'
		},
		{
			href: 'https://github.com/nijasc/nilsschlegel.dev#readme',
			icon: BookOpen,
			label: 'Read the README',
			style: 'btn-ghost'
		}
	];
</script>

<section class="flex flex-col gap-12 px-1 py-4">
	<div class="flex items-end justify-between border-b border-base-300 pb-6">
		<div>
			<p class="mb-1 text-sm font-medium tracking-widest text-primary uppercase">Open Source</p>
			<h1 class="text-4xl font-bold tracking-tight text-base-content">Source Code</h1>
		</div>
		<a
			href="https://github.com/nijasc/nilsschlegel.dev"
			target="_blank"
			class="btn gap-2 btn-primary"
		>
			<Github class="h-4 w-4" />
			GitHub
		</a>
	</div>

	<div class="rounded-2xl border border-base-300 bg-base-100 p-6">
		<p class="mb-2 leading-relaxed text-base-content/70">
			I love building in the open. Explore the codebase, learn from it, suggest improvements, or use
			parts of it in your own projects.
		</p>
		<div class="mt-5 flex flex-wrap gap-3">
			{#each actions as action}
				<a href={action.href} target="_blank" class="btn gap-2 btn-sm {action.style}">
					<action.icon class="h-4 w-4" />
					{action.label}
				</a>
			{/each}
		</div>
	</div>

	<div class="grid gap-4 sm:grid-cols-3">
		{#each stats as stat}
			<div class="rounded-2xl border border-base-300 bg-base-100 p-5">
				<p class="text-xs font-medium tracking-widest text-base-content/40 uppercase">
					{stat.title}
				</p>
				<p class="mt-2 text-2xl font-bold {stat.color}">{stat.value}</p>
				<p class="mt-1 text-sm text-base-content/60">{stat.desc}</p>
			</div>
		{/each}
	</div>

	<div class="rounded-2xl border border-base-300 bg-base-100 p-6">
		<p class="mb-4 text-sm font-medium tracking-widest text-base-content/50 uppercase">
			What you'll find
		</p>
		<ul class="space-y-2">
			{#each highlights as item}
				<li class="flex items-start gap-3 text-sm text-base-content/70">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
					{item}
				</li>
			{/each}
		</ul>
	</div>
</section>
