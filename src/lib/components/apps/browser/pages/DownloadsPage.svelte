<script lang="ts">
	import { Download } from 'lucide-svelte';

	const downloads = [
		{
			title: 'CV',
			description: 'Concise overview of experience, skills, and education.',
			href: '/downloads/cv.pdf',
			label: 'Download CV',
			tag: 'PDF'
		},
		{
			title: 'Certificates',
			description: 'Verified certifications and achievements bundled together.',
			href: '/downloads/certificates.pdf',
			label: 'Download',
			tag: 'PDF'
		}
	];

	const included = [
		'Latest CV with role highlights and tools used',
		'Certificates with dates and issuing organizations',
		'Consistent formatting and accessible structure'
	];
</script>

<section class="flex flex-col gap-12 px-1 py-4">
	<div class="flex items-end justify-between border-b border-base-300 pb-6">
		<div>
			<p class="mb-1 text-sm font-medium tracking-widest text-primary uppercase">Resources</p>
			<h1 class="text-4xl font-bold tracking-tight text-base-content">Downloads</h1>
		</div>
		<a href="/downloads/all-materials.zip" download class="btn gap-2 btn-primary">
			<Download class="h-4 w-4" />
			Download All
		</a>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		{#each downloads as item}
			<div
				class="group flex flex-col justify-between gap-6 rounded-2xl border border-base-300 bg-base-100 p-6 transition-shadow hover:shadow-md"
			>
				<div class="flex flex-col gap-2">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-semibold text-base-content">{item.title}</h2>
						<span
							class="rounded-md border border-base-300 bg-base-200 px-2 py-0.5 text-xs font-medium text-base-content/60"
						>
							{item.tag}
						</span>
					</div>
					<p class="text-sm leading-relaxed text-base-content/60">{item.description}</p>
				</div>
				<a
					href={item.href}
					download
					class="btn w-fit gap-2 transition-colors btn-outline btn-sm group-hover:btn-primary"
				>
					<Download class="h-3.5 w-3.5" />
					{item.label}
				</a>
			</div>
		{/each}
	</div>

	<div class="rounded-2xl border border-base-300 bg-base-100 p-6">
		<p class="mb-4 text-sm font-medium tracking-widest text-base-content/50 uppercase">
			What's included
		</p>
		<ul class="space-y-2">
			{#each included as item}
				<li class="flex items-start gap-3 text-sm text-base-content/70">
					<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
					{item}
				</li>
			{/each}
		</ul>
	</div>
</section>
