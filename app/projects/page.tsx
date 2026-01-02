/**
 * Projects Index Page
 * Browse all projects with filtering
 */

'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from '@/components/projects';
import { ProjectFilters } from '@/components/projects';
import { Badge } from '@/components/ui/badge';
import { PageTransition } from '@/components/animations';
import { allProjects } from '@/data/projects';

/**
 * Projects Page Component
 *
 * Features:
 * - Grid layout with Bento-style sizing
 * - Filter by technology
 * - Featured project highlighted
 * - Responsive design
 */
export default function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  /**
   * Get all unique technologies across all projects
   */
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    allProjects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  /**
   * Count projects per technology
   */
  const techCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allTechnologies.forEach((tech) => {
      counts[tech] = allProjects.filter((p) => p.techStack.includes(tech)).length;
    });
    return counts;
  }, [allTechnologies]);

  /**
   * Filter projects based on selected technology
   */
  const filteredProjects = useMemo(() => {
    if (!selectedTech) return allProjects;
    return allProjects.filter((project) => project.techStack.includes(selectedTech));
  }, [selectedTech]);

  /**
   * Separate featured and regular projects
   */
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <PageTransition variant="slideUp">
      <main className="relative min-h-screen bg-surface-primary">
        {/* Header */}
        <div className="border-b border-surface-border bg-surface-secondary">
          <div className="container-custom py-12">
            <div className="mb-4 flex items-center gap-2">
              <Badge variant="primary">Projects</Badge>
              <Badge variant="secondary">{allProjects.length} Total</Badge>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">My Work</h1>
            <p className="max-w-2xl text-lg text-text-secondary">
              A collection of projects I've built, from enterprise systems serving thousands of users
              to experimental tools exploring new technologies.
            </p>
          </div>
        </div>

      {/* Content */}
      <div className="container-custom py-12">
        {/* Filters */}
        <div className="mb-8">
          <ProjectFilters
            technologies={allTechnologies}
            selectedTech={selectedTech}
            onTechSelect={setSelectedTech}
            techCounts={techCounts}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-text-secondary">
            {selectedTech ? (
              <>
                Showing <span className="font-medium text-text-primary">{filteredProjects.length}</span>{' '}
                {filteredProjects.length === 1 ? 'project' : 'projects'} using{' '}
                <span className="font-medium text-primary">{selectedTech}</span>
              </>
            ) : (
              <>
                Showing all <span className="font-medium text-text-primary">{allProjects.length}</span>{' '}
                projects
              </>
            )}
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold">Featured Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* All Projects */}
        {regularProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <h2 className="mb-6 text-2xl font-bold">More Projects</h2>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} variant="default" />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="rounded-lg border border-surface-border bg-surface-secondary p-12 text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-text-tertiary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mb-2 text-xl font-bold">No projects found</h3>
            <p className="mb-4 text-text-secondary">
              No projects match the selected technology filter.
            </p>
            <button
              onClick={() => setSelectedTech(null)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface-primary transition-colors hover:bg-primary/90"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      </main>
    </PageTransition>
  );
}
