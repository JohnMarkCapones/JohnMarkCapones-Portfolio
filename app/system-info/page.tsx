/**
 * System Info Page
 * Resume presented as a VS Code-style code editor
 */

'use client';

import { useState, useEffect } from 'react';
import { CodeEditor } from '@/components/code-editor/CodeEditor';
import { FileExplorer } from '@/components/code-editor/FileExplorer';
import { EditorTabs } from '@/components/code-editor/EditorTabs';
import { resumeFiles, getFileById, type FileItem } from '@/lib/resume-files';
import { Badge } from '@/components/ui/badge';
import { PageTransition } from '@/components/animations';

/**
 * System Info Page Component
 *
 * Features:
 * - VS Code-style interface
 * - File explorer sidebar
 * - Multiple tabs for open files
 * - Syntax highlighted code
 * - Copy and download functionality
 */
export default function SystemInfoPage() {
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string>('readme');

  /**
   * Initialize with README open
   */
  useEffect(() => {
    const readme = getFileById('readme');
    if (readme) {
      setOpenFiles([readme]);
      setActiveFileId('readme');
    }
  }, []);

  /**
   * Handle file selection from explorer
   */
  const handleFileSelect = (file: FileItem) => {
    if (file.type !== 'file') return;

    // Add to open files if not already open
    if (!openFiles.find((f) => f.id === file.id)) {
      setOpenFiles([...openFiles, file]);
    }

    // Set as active
    setActiveFileId(file.id);
  };

  /**
   * Handle tab click
   */
  const handleTabClick = (fileId: string) => {
    setActiveFileId(fileId);
  };

  /**
   * Handle tab close
   */
  const handleTabClose = (fileId: string) => {
    const newOpenFiles = openFiles.filter((f) => f.id !== fileId);
    setOpenFiles(newOpenFiles);

    // If closing active tab, switch to another
    if (fileId === activeFileId && newOpenFiles.length > 0) {
      setActiveFileId(newOpenFiles[0]!.id);
    }
  };

  /**
   * Download all as ZIP (future enhancement)
   */
  const handleDownloadAll = () => {
    // TODO: Implement ZIP download of all files
    alert('Download all functionality coming soon!');
  };

  /**
   * Get current active file
   */
  const activeFile = openFiles.find((f) => f.id === activeFileId);

  return (
    <PageTransition variant="slideDown">
      <main className="relative min-h-screen bg-surface-primary">
      {/* Header */}
      <div className="border-b border-surface-border bg-surface-secondary">
        <div className="container-custom flex items-center justify-between py-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="success" dot>
                System Info
              </Badge>
              <Badge variant="secondary">Resume</Badge>
            </div>
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">Human Configuration</h1>
            <p className="text-text-secondary">
              My resume presented as code. Because developers read code better than PDFs.
            </p>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 rounded-md border border-surface-border bg-surface-secondary px-4 py-2 text-sm transition-colors hover:bg-surface-tertiary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download All
            </button>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="container-custom py-8">
        <div className="overflow-hidden rounded-lg border border-surface-border shadow-glow-lg">
          {/* VS Code Style Interface */}
          <div className="flex h-[800px] bg-surface-primary">
            {/* File Explorer */}
            <FileExplorer
              files={resumeFiles}
              activeFileId={activeFileId}
              onFileSelect={handleFileSelect}
            />

            {/* Editor Area */}
            <div className="flex flex-1 flex-col">
              {/* Tabs */}
              <EditorTabs
                files={openFiles}
                activeFileId={activeFileId}
                onTabClick={handleTabClick}
                onTabClose={handleTabClose}
              />

              {/* Code Editor */}
              {activeFile ? (
                <CodeEditor file={activeFile} showLineNumbers={true} readOnly={true} />
              ) : (
                <div className="flex flex-1 items-center justify-center bg-code-bg">
                  <div className="text-center">
                    <p className="mb-4 text-lg text-text-secondary">No file open</p>
                    <p className="text-sm text-text-tertiary">
                      Select a file from the explorer to view its contents
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 rounded-lg border border-surface-border bg-surface-secondary p-6">
          <h2 className="mb-4 text-xl font-bold">How to Use</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h3 className="mb-2 font-medium text-primary">📁 Explorer</h3>
              <p className="text-sm text-text-secondary">
                Click files in the sidebar to open them. Each file contains different aspects of
                my resume.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-primary">📋 Copy & Download</h3>
              <p className="text-sm text-text-secondary">
                Use the buttons in each file to copy code or download individual files.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-primary">🔍 Explore</h3>
              <p className="text-sm text-text-secondary">
                Each file type (JSON, YAML, Markdown) shows data in different formats. Pick your
                favorite!
              </p>
            </div>
          </div>
        </div>

        {/* File Guide */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resumeFiles[0]?.children?.map((file) => (
            <button
              key={file.id}
              onClick={() => handleFileSelect(file)}
              className="group rounded-lg border border-surface-border bg-surface-secondary p-4 text-left transition-all hover:border-primary/50 hover:shadow-glow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">{file.icon}</span>
                <span className="text-sm font-medium group-hover:text-primary">{file.name}</span>
              </div>
              <p className="text-xs text-text-tertiary">
                {file.id === 'readme' && 'Introduction and overview'}
                {file.id === 'resume' && 'Full resume in JSON Resume format'}
                {file.id === 'skills' && 'Technical skills with proficiency levels'}
                {file.id === 'experience' && 'Work experience and projects'}
                {file.id === 'education' && 'Academic background in YAML'}
                {file.id === 'projects' && 'Project configuration file'}
                {file.id === 'contact' && 'Contact information as environment variables'}
                {file.id === 'package' && 'Me as an npm package'}
              </p>
            </button>
          ))}
        </div>
      </div>
      </main>
    </PageTransition>
  );
}
