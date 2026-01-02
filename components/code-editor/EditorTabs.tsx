/**
 * Editor Tabs Component
 * VS Code-style tab bar for open files
 */

'use client';

import { cn } from '@/lib/utils';
import type { FileItem } from '@/lib/resume-files';

/**
 * Editor Tabs Props
 */
export interface EditorTabsProps {
  /**
   * Open files
   */
  files: FileItem[];

  /**
   * Active file ID
   */
  activeFileId: string;

  /**
   * Callback when tab is clicked
   */
  onTabClick: (fileId: string) => void;

  /**
   * Callback when tab is closed
   */
  onTabClose: (fileId: string) => void;
}

/**
 * Editor Tabs Component
 *
 * Displays tabs for open files in code editor
 *
 * @example
 * ```tsx
 * <EditorTabs
 *   files={openFiles}
 *   activeFileId="readme"
 *   onTabClick={handleTabClick}
 *   onTabClose={handleTabClose}
 * />
 * ```
 */
export function EditorTabs({ files, activeFileId, onTabClick, onTabClose }: EditorTabsProps) {
  return (
    <div className="flex items-center gap-px border-b border-surface-border bg-surface-primary">
      {files.map((file) => {
        const isActive = file.id === activeFileId;

        return (
          <div
            key={file.id}
            className={cn(
              'group relative flex items-center gap-2 border-r border-surface-border px-4 py-2',
              'transition-colors',
              isActive
                ? 'bg-surface-secondary text-text-primary'
                : 'bg-surface-primary text-text-secondary hover:bg-surface-secondary/50'
            )}
          >
            {/* Tab Button */}
            <button
              onClick={() => onTabClick(file.id)}
              className="flex items-center gap-2 text-sm"
            >
              {/* Icon */}
              {file.icon && <span className="text-base">{file.icon}</span>}

              {/* File Name */}
              <span className={cn('max-w-[120px] truncate', isActive && 'font-medium')}>
                {file.name}
              </span>
            </button>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(file.id);
              }}
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded opacity-0 transition-opacity',
                'hover:bg-surface-tertiary',
                'group-hover:opacity-100',
                isActive && 'opacity-100'
              )}
              aria-label={`Close ${file.name}`}
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Active Indicator */}
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </div>
        );
      })}

      {/* Empty State Message */}
      {files.length === 0 && (
        <div className="flex-1 px-4 py-2 text-sm text-text-tertiary">
          No files open. Select a file from the explorer.
        </div>
      )}
    </div>
  );
}
