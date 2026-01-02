/**
 * Project Not Found Page
 * 404 page for invalid project slugs
 */

import Link from 'next/link';

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-primary">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-2xl font-bold">Project Not Found</h2>
        <p className="mb-8 text-text-secondary">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-surface-primary transition-colors hover:bg-primary/90"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
