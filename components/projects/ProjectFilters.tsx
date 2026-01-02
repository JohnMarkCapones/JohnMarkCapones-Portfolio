/**
 * Project Filters Component
 * Filter projects by technology, status, etc.
 */

'use client';

import { cn } from '@/lib/utils';

/**
 * Project Filters Props
 */
export interface ProjectFiltersProps {
  /**
   * Available technologies
   */
  technologies: string[];

  /**
   * Selected technology filter
   */
  selectedTech: string | null;

  /**
   * Callback when technology is selected
   */
  onTechSelect: (tech: string | null) => void;

  /**
   * Project count per technology
   */
  techCounts?: Record<string, number>;
}

/**
 * Project Filters Component
 *
 * Features:
 * - Filter by technology
 * - Show project count per tech
 * - Clear filters button
 * - Responsive layout
 *
 * @example
 * ```tsx
 * <ProjectFilters
 *   technologies={allTechs}
 *   selectedTech={selectedTech}
 *   onTechSelect={setSelectedTech}
 * />
 * ```
 */
export function ProjectFilters({
  technologies,
  selectedTech,
  onTechSelect,
  techCounts = {},
}: ProjectFiltersProps) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface-secondary p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold">Filter by Technology</h3>
        {selectedTech && (
          <button
            onClick={() => onTechSelect(null)}
            className="text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Technology Filters */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => {
          const isSelected = selectedTech === tech;
          const count = techCounts[tech] || 0;

          return (
            <button
              key={tech}
              onClick={() => onTechSelect(isSelected ? null : tech)}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all',
                isSelected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-surface-border bg-surface-tertiary text-text-secondary hover:border-primary/50 hover:text-text-primary'
              )}
            >
              <span>{tech}</span>
              {count > 0 && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-xs',
                    isSelected ? 'bg-primary/20' : 'bg-surface-border'
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Filter Info */}
      {selectedTech && (
        <div className="mt-4 rounded-md bg-primary/5 p-3">
          <p className="text-sm text-text-secondary">
            Showing projects using <span className="font-medium text-primary">{selectedTech}</span>
            {techCounts[selectedTech] && (
              <span className="ml-1">
                ({techCounts[selectedTech]} {techCounts[selectedTech] === 1 ? 'project' : 'projects'})
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
