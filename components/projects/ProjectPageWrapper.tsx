/**
 * Project Page Wrapper
 * Client wrapper for project page with transitions
 */

'use client';

import { PageTransition } from '@/components/animations';
import type { ReactNode } from 'react';

/**
 * Project Page Wrapper Props
 */
export interface ProjectPageWrapperProps {
  children: ReactNode;
}

/**
 * Project Page Wrapper Component
 *
 * Wraps project page content with page transition
 */
export function ProjectPageWrapper({ children }: ProjectPageWrapperProps) {
  return <PageTransition variant="scale">{children}</PageTransition>;
}
