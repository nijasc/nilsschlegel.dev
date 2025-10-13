<script lang="ts"></script>

<section class="flex flex-col gap-8">
	<div class="navbar bg-base-100 rounded-box shadow">
		<div class="flex-1">
			<span class="text-xl font-semibold">Downloads</span>
		</div>
		<div class="flex-none">
			<a href="/downloads/all-materials.zip" download class="btn btn-primary">
				Download All
			</a>
		</div>
	</div>

	<div class="grid gap-6 md:grid-cols-3">
		<div class="card bg-base-100 border border-base-300">
			<div class="card-body">
				<h2 class="card-title">CV</h2>
				<p class="text-base-content/80">
					A concise overview of experience, skills, and education.
				</p>
				<div class="card-actions justify-between items-center pt-2">
					<div class="badge badge-primary badge-outline">PDF</div>
					<a href="/downloads/cv.pdf" download class="btn btn-primary btn-sm">
						Get CV
					</a>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 border border-base-300">
			<div class="card-body">
				<h2 class="card-title">Certificates</h2>
				<p class="text-base-content/80">
					Verified certifications and achievements bundled together.
				</p>
				<div class="card-actions justify-between items-center pt-2">
					<div class="badge badge-secondary badge-outline">ZIP</div>
					<a
						href="/downloads/certificates.zip"
						download
						class="btn btn-secondary btn-sm"
					>
						Get Certificates
					</a>
				</div>
			</div>
		</div>

		<div class="card bg-base-100 border border-base-300">
			<div class="card-body">
				<h2 class="card-title">Motivation Letter</h2>
				<p class="text-base-content/80">
					A tailored letter highlighting interests and fit.
				</p>
				<div class="card-actions justify-between items-center pt-2">
					<div class="badge badge-accent badge-outline">PDF</div>
					<a
						href="/downloads/motivation-letter.pdf"
						download
						class="btn btn-accent btn-sm"
					>
						Get Letter
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="collapse collapse-arrow bg-base-200 rounded-box">
		<input type="checkbox" />
		<div class="collapse-title text-lg font-medium">
			What?s included in the full package?
		</div>
		<div class="collapse-content">
			<ul class="list-disc ml-5 space-y-1 text-base-content/80">
				<li>Latest CV with role highlights and tools used</li>
				<li>Certificates with dates and issuing organizations</li>
				<li>Motivation letter as a printable PDF</li>
				<li>Consistent formatting and accessible structure</li>
			</ul>
			<div class="pt-4">
				<a href="/downloads/all-materials.zip" download class="btn btn-outline">
					Download Everything
				</a>
			</div>
		</div>
	</div>

	<div class="join self-start">
		<a href="/downloads/cv.pdf" download class="btn join-item">CV</a>
		<a href="/downloads/certificates.zip" download class="btn join-item">
			Certificates
		</a>
		<a href="/downloads/motivation-letter.pdf" download class="btn join-item">
			Motivation Letter
		</a>
		<a href="/downloads/all-materials.zip" download class="btn btn-primary join-item">
			All
		</a>
	</div>
</section>