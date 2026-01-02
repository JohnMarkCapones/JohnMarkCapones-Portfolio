/**
 * Individual Project Page
 * Detailed project case study
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectPageWrapper } from '@/components/projects';
import { allProjects, getProjectBySlug } from '@/data/projects';

/**
 * Generate static params for all projects
 */
export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}

/**
 * Generate metadata for project page
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

/**
 * Project Detail Page Component
 */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  // 404 if project not found
  if (!project) {
    notFound();
  }

  return (
    <ProjectPageWrapper>
      <main className="relative min-h-screen bg-surface-primary">
      {/* Breadcrumbs */}
      <div className="border-b border-surface-border bg-surface-secondary">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-sm text-text-secondary">
            <Link href="/" className="hover:text-text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-text-primary">
              Projects
            </Link>
            <span>/</span>
            <span className="text-text-primary">{project.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="border-b border-surface-border bg-gradient-to-br from-surface-secondary to-surface-primary">
        <div className="container-custom py-16">
          {/* Badges */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge variant={project.status === 'live' ? 'success' : 'secondary'} dot>
              {project.status}
            </Badge>
            {project.featured && <Badge variant="primary">Featured</Badge>}
            {project.users && <Badge variant="secondary">{project.users.toLocaleString()}+ Users</Badge>}
          </div>

          {/* Title & Description */}
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">{project.title}</h1>
          <p className="mb-8 max-w-3xl text-xl text-text-secondary">{project.tagline}</p>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-surface-primary shadow-glow-sm transition-all hover:bg-primary/90 hover:shadow-glow-md"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Live Site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-surface-border bg-surface-secondary px-6 py-3 font-medium transition-colors hover:bg-surface-tertiary"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Source Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold">Overview</h2>
              <p className="text-lg leading-relaxed text-text-secondary">{project.description}</p>
            </section>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Key Features</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.features.map((feature, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="text-text-secondary">{feature}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges & Solutions */}
            {project.challenges && project.challenges.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Challenges & Solutions</h2>
                <div className="space-y-6">
                  {project.challenges.map((challenge, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="mb-2 text-lg font-bold text-primary">{challenge.title}</h3>
                        <p className="mb-4 text-text-secondary">{challenge.description}</p>
                        {challenge.solution && (
                          <div className="rounded-md bg-surface-tertiary p-4">
                            <p className="text-sm font-medium text-accent-green">Solution:</p>
                            <p className="mt-1 text-sm text-text-secondary">{challenge.solution}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <section className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">Impact & Metrics</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <Card key={metric.label}>
                      <CardContent className="p-6 text-center">
                        <p className="mb-1 text-3xl font-bold text-primary">{metric.value}</p>
                        <p className="text-sm text-text-tertiary">{metric.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-bold">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-bold">Timeline</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-text-tertiary">Started</p>
                    <p className="font-medium">{project.timeline.started}</p>
                  </div>
                  {project.timeline.launched && (
                    <div>
                      <p className="text-sm text-text-tertiary">Launched</p>
                      <p className="font-medium">{project.timeline.launched}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-bold">Links</h3>
                <div className="space-y-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Live Website
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Source Code
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Back to Projects */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>
      </main>
    </ProjectPageWrapper>
  );
}
