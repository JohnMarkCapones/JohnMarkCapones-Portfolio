/**
 * Contribution Graph Component
 * GitHub-style contribution heatmap
 */

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMockContributions, type ContributionDay } from '@/lib/github';
import { cn } from '@/lib/utils';

/**
 * Contribution Graph Props
 */
export interface ContributionGraphProps {
  /**
   * Custom className
   */
  className?: string;
}

/**
 * Get color for contribution level
 */
function getContributionColor(level: 0 | 1 | 2 | 3 | 4): string {
  const colors = {
    0: 'bg-surface-tertiary',
    1: 'bg-accent-green/30',
    2: 'bg-accent-green/50',
    3: 'bg-accent-green/70',
    4: 'bg-accent-green',
  };
  return colors[level];
}

/**
 * Group contributions by week
 */
function groupByWeeks(contributions: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  // Start from the first Sunday
  const firstDate = new Date(contributions[0]?.date || '');
  const firstDayOfWeek = firstDate.getDay();

  // Add empty days if week doesn't start on Sunday
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push({
      date: '',
      count: 0,
      level: 0,
    });
  }

  contributions.forEach((day, index) => {
    currentWeek.push(day);

    // If Sunday or last day, push week
    const date = new Date(day.date);
    if (date.getDay() === 6 || index === contributions.length - 1) {
      // Fill remaining days if needed
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: '',
          count: 0,
          level: 0,
        });
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return weeks;
}

/**
 * Contribution Cell Component
 */
interface ContributionCellProps {
  day: ContributionDay;
}

function ContributionCell({ day }: ContributionCellProps) {
  if (!day.date) {
    return <div className="h-3 w-3" />;
  }

  const date = new Date(day.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      className={cn(
        'h-3 w-3 rounded-sm transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-surface-primary',
        getContributionColor(day.level)
      )}
      title={`${day.count} contributions on ${formattedDate}`}
    />
  );
}

/**
 * Contribution Graph Component
 *
 * Displays a GitHub-style contribution heatmap
 */
export function ContributionGraph({ className }: ContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);

  useEffect(() => {
    const data = getMockContributions();
    setContributions(data);
    setWeeks(groupByWeeks(data));
  }, []);

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Graph Container */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Month Labels */}
            <div className="mb-2 flex gap-1 pl-8">
              {monthLabels.map((month) => (
                <div
                  key={month}
                  className="text-xs text-text-tertiary"
                  style={{ width: `${(weeks.length / 12) * 100}px` }}
                >
                  {month}
                </div>
              ))}
            </div>

            {/* Graph Grid */}
            <div className="flex gap-1">
              {/* Day Labels */}
              <div className="flex flex-col justify-between pr-2">
                {dayLabels.map((day, index) => (
                  <div
                    key={day}
                    className={cn(
                      'h-3 text-xs text-text-tertiary',
                      index % 2 === 0 ? 'visible' : 'invisible'
                    )}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Contribution Cells */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <ContributionCell key={`${weekIndex}-${dayIndex}`} day={day} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <span className="text-xs text-text-tertiary">Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn('h-3 w-3 rounded-sm', getContributionColor(level as 0 | 1 | 2 | 3 | 4))}
                  />
                ))}
              </div>
              <span className="text-xs text-text-tertiary">More</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 rounded-lg bg-surface-tertiary p-4">
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">
              {contributions.reduce((sum, day) => sum + day.count, 0)}
            </span>{' '}
            contributions in the last year
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
