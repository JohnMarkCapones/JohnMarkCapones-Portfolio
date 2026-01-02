/**
 * File Explorer Component
 * VS Code-style file sidebar
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { FileItem } from '@/lib/resume-files';

/**
 * File Explorer Props
 */
export interface FileExplorerProps {
  /**
   * File structure to display
   */
  files: FileItem[];

  /**
   * Currently active file ID
   */
  activeFileId?: string;

  /**
   * Callback when file is clicked
   */
  onFileSelect: (file: FileItem) => void;

  /**
   * Collapsed state
   */
  collapsed?: boolean;
}

/**
 * File Explorer Item Props
 */
interface FileExplorerItemProps {
  item: FileItem;
  level: number;
  activeFileId?: string;
  onSelect: (file: FileItem) => void;
}

/**
 * File Explorer Item Component
 */
function FileExplorerItem({ item, level, activeFileId, onSelect }: FileExplorerItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isActive = item.id === activeFileId;
  const isFolder = item.type === 'folder';

  const handleClick = () => {
    if (isFolder) {
      setIsOpen(!isOpen);
    } else {
      onSelect(item);
    }
  };

  return (
    <div>
      {/* Item Button */}
      <button
        onClick={handleClick}
        className={cn(
          'w-full flex items-center gap-2 px-2 py-1 text-sm transition-colors',
          'hover:bg-surface-tertiary',
          isActive && 'bg-surface-tertiary text-primary'
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {/* Folder Arrow */}
        {isFolder && (
          <svg
            className={cn('h-3 w-3 transition-transform', isOpen && 'rotate-90')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}

        {/* Icon */}
        {item.icon && <span className="text-base">{item.icon}</span>}

        {/* Name */}
        <span className={cn('flex-1 truncate text-left', isActive && 'font-medium')}>
          {item.name}
        </span>
      </button>

      {/* Children (if folder and open) */}
      {isFolder && isOpen && item.children && (
        <div>
          {item.children.map((child) => (
            <FileExplorerItem
              key={child.id}
              item={child}
              level={level + 1}
              activeFileId={activeFileId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * File Explorer Component
 *
 * Displays a VS Code-style file tree sidebar
 *
 * @example
 * ```tsx
 * <FileExplorer
 *   files={resumeFiles}
 *   activeFileId="readme"
 *   onFileSelect={handleFileSelect}
 * />
 * ```
 */
export function FileExplorer({ files, activeFileId, onFileSelect, collapsed }: FileExplorerProps) {
  if (collapsed) {
    return (
      <div className="flex h-full w-12 flex-col items-center gap-2 border-r border-surface-border bg-surface-secondary p-2">
        {files[0]?.children?.map((file) => (
          <button
            key={file.id}
            onClick={() => file.type === 'file' && onFileSelect(file)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded transition-colors',
              'hover:bg-surface-tertiary',
              activeFileId === file.id && 'bg-surface-tertiary text-primary'
            )}
            title={file.name}
          >
            <span className="text-lg">{file.icon}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full w-64 flex-col border-r border-surface-border bg-surface-secondary">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
          Explorer
        </span>
        <button className="text-text-tertiary hover:text-text-primary">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto py-2">
        {files.map((item) => (
          <FileExplorerItem
            key={item.id}
            item={item}
            level={0}
            activeFileId={activeFileId}
            onSelect={onFileSelect}
          />
        ))}
      </div>

      {/* Footer Stats */}
      <div className="border-t border-surface-border px-4 py-2">
        <p className="text-xs text-text-tertiary">
          {files[0]?.children?.length || 0} files
        </p>
      </div>
    </div>
  );
}
