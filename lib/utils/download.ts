/**
 * Download Utilities
 * Functions for downloading files and creating ZIP archives
 */

import JSZip from 'jszip';
import type { FileItem } from '@/lib/resume-files';

/**
 * Download a single file
 */
export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download all resume files as a ZIP archive
 */
export async function downloadAllAsZip(files: FileItem[], zipName: string = 'resume-files.zip') {
  const zip = new JSZip();

  // Recursive function to add files to zip
  function addFilesToZip(items: FileItem[], folder: JSZip | null = null) {
    items.forEach((item) => {
      if (item.type === 'folder' && item.children) {
        // Create folder in zip
        const newFolder = folder ? folder.folder(item.name) : zip.folder(item.name);
        if (newFolder) {
          addFilesToZip(item.children, newFolder);
        }
      } else if (item.type === 'file' && item.content) {
        // Add file to zip
        if (folder) {
          folder.file(item.name, item.content);
        } else {
          zip.file(item.name, item.content);
        }
      }
    });
  }

  // Add all files
  addFilesToZip(files);

  // Generate ZIP and download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = zipName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download resume PDF from public folder
 */
export function downloadResume(filename: string = 'John-Mark-Capones-Resume.pdf') {
  const link = document.createElement('a');
  link.href = `/resume/${filename}`;
  link.download = filename;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
