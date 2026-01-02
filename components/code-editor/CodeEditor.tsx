/**
 * Code Editor Component
 * VS Code-style code display with syntax highlighting
 */

'use client';

import { useState, useRef } from 'react';
import type { JSX } from 'react';
import { cn } from '@/lib/utils';
import type { FileItem } from '@/lib/resume-files';

/**
 * Code Editor Props
 */
export interface CodeEditorProps {
  /**
   * File to display
   */
  file: FileItem;

  /**
   * Show line numbers
   */
  showLineNumbers?: boolean;

  /**
   * Read-only mode
   */
  readOnly?: boolean;
}

/**
 * Syntax Highlighter Component
 */
function SyntaxHighlighter({ code, language }: { code: string; language: string }) {
  const lines = code.split('\n');

  // Simple syntax highlighting based on language
  const highlightLine = (line: string, lang: string): JSX.Element => {
    // JSON highlighting
    if (lang === 'json') {
      const highlighted = line
        .replace(/"([^"]+)":/g, '<span class="text-accent-green">"$1"</span>:')
        .replace(/:\s*"([^"]*)"/g, ': <span class="text-accent-amber">"$1"</span>')
        .replace(/:\s*(\d+)/g, ': <span class="text-primary">$1</span>')
        .replace(/:\s*(true|false|null)/g, ': <span class="text-accent-red">$1</span>');

      return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    }

    // TypeScript/JavaScript highlighting
    if (lang === 'typescript' || lang === 'javascript') {
      const highlighted = line
        .replace(
          /\b(const|let|var|function|class|interface|type|export|import|from|return)\b/g,
          '<span class="text-accent-red">$1</span>'
        )
        .replace(/'([^']*)'/g, '<span class="text-accent-amber">\'$1\'</span>')
        .replace(/"([^"]*)"/g, '<span class="text-accent-amber">"$1"</span>')
        .replace(/\/\/(.*)/g, '<span class="text-text-tertiary">//$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-primary">$1</span>');

      return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    }

    // Markdown highlighting
    if (lang === 'markdown') {
      const highlighted = line
        .replace(/^(#{1,6})\s+(.+)/, '<span class="text-primary font-bold">$1 $2</span>')
        .replace(/\*\*([^*]+)\*\*/g, '<span class="font-bold">$1</span>')
        .replace(/\*([^*]+)\*/g, '<span class="italic">$1</span>')
        .replace(/`([^`]+)`/g, '<span class="text-accent-amber font-mono">$1</span>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="text-primary underline">$1</span>');

      return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    }

    // YAML highlighting
    if (lang === 'yaml') {
      const highlighted = line
        .replace(/^(\s*)([a-zA-Z_]+):/g, '$1<span class="text-accent-green">$2</span>:')
        .replace(/:\s*"([^"]*)"/g, ': <span class="text-accent-amber">"$1"</span>')
        .replace(/:\s*(\d+)/g, ': <span class="text-primary">$1</span>')
        .replace(/#(.*)/g, '<span class="text-text-tertiary">#$1</span>')
        .replace(/:\s*(true|false|null)/g, ': <span class="text-accent-red">$1</span>');

      return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    }

    // ENV highlighting
    if (lang === 'env') {
      const highlighted = line
        .replace(/^([A-Z_]+)=/g, '<span class="text-accent-green">$1</span>=')
        .replace(/="([^"]*)"/g, '=<span class="text-accent-amber">"$1"</span>')
        .replace(/#(.*)/g, '<span class="text-text-tertiary">#$1</span>');

      return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
    }

    // Default: no highlighting
    return <span>{line}</span>;
  };

  return (
    <div>
      {lines.map((line, index) => (
        <div key={index} className="min-h-[1.5rem]">
          {highlightLine(line, language)}
        </div>
      ))}
    </div>
  );
}

/**
 * Code Editor Component
 *
 * Displays file content with syntax highlighting
 *
 * @example
 * ```tsx
 * <CodeEditor
 *   file={currentFile}
 *   showLineNumbers={true}
 *   readOnly={true}
 * />
 * ```
 */
export function CodeEditor({ file, showLineNumbers = true, readOnly = true }: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const content = file.content || '';
  const lines = content.split('\n');
  const language = file.language || 'text';

  /**
   * Copy code to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /**
   * Download file
   */
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full flex-col bg-code-bg">
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-surface-border bg-surface-secondary px-4 py-2">
        {/* File Info */}
        <div className="flex items-center gap-2">
          <span className="text-lg">{file.icon}</span>
          <span className="text-sm font-medium">{file.name}</span>
          {readOnly && (
            <span className="rounded bg-surface-tertiary px-2 py-0.5 text-xs text-text-tertiary">
              Read-only
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1 rounded px-3 py-1 text-xs transition-colors',
              'hover:bg-surface-tertiary',
              copied && 'text-accent-green'
            )}
          >
            {copied ? (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 rounded px-3 py-1 text-xs transition-colors hover:bg-surface-tertiary"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex flex-1 overflow-auto font-mono text-sm">
        {/* Line Numbers */}
        {showLineNumbers && (
          <div className="sticky left-0 select-none border-r border-surface-border bg-surface-secondary px-4 py-4 text-right text-text-tertiary">
            {lines.map((_, index) => (
              <div key={index} className="min-h-[1.5rem]">
                {index + 1}
              </div>
            ))}
          </div>
        )}

        {/* Code Content */}
        <div ref={codeRef} className="flex-1 px-4 py-4 text-code-text">
          <SyntaxHighlighter code={content} language={language} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between border-t border-surface-border bg-surface-secondary px-4 py-1 text-xs text-text-tertiary">
        <div className="flex items-center gap-4">
          <span>Language: {language}</span>
          <span>Lines: {lines.length}</span>
          <span>Characters: {content.length}</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}
