/**
 * Type Definitions
 * Centralized type definitions for the entire application
 */

/**
 * Skill proficiency levels and usage details
 */
export interface Skill {
  name: string;
  proficiency: number; // 0-100
  experience: string; // e.g., "2 years", "6 months"
  usage: string; // Detailed explanation of how and why this skill is used
  projects: string[]; // Array of project names using this skill
  category: SkillCategory;
  tags?: string[]; // Optional tags for filtering
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'databases'
  | 'cloud-devops'
  | 'tools'
  | 'testing'
  | 'other';

/**
 * Project details and metadata
 */
export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  featured: boolean; // Whether this is the main/featured project

  // URLs and links
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;

  // Tech stack and skills
  techStack: string[];
  skills: string[]; // Links to skill names

  // Project details
  role?: {
    title: string; // e.g., "Full-Stack Developer & Team Lead"
    responsibilities: string[]; // What you did
    teamSize?: string; // e.g., "Solo" or "Team of 5"
    contributions?: string[]; // Specific contributions/impact
  };

  timeline: {
    started: string; // ISO date string or "Month Year"
    launched?: string;
    duration?: string;
  };

  status: ProjectStatus;

  // Metrics and impact
  users?: number;
  metrics?: ProjectMetric[];

  // Content
  features: string[];
  challenges?: Challenge[];

  // Media
  thumbnail?: string;
  images?: string[];
  videoUrl?: string;

  // Categorization
  category: ProjectCategory;
  tags: string[];
}

export type ProjectStatus = 'live' | 'development' | 'completed' | 'archived';

export type ProjectCategory =
  | 'web-app'
  | 'mobile-app'
  | 'desktop-app'
  | 'api'
  | 'library'
  | 'other';

export interface ProjectMetric {
  label: string;
  value: string | number;
  description?: string;
}

export interface Challenge {
  title: string;
  description: string;
  solution: string;
}

/**
 * Timeline event for journey/career timeline
 */
export interface TimelineEvent {
  id: string;
  year: number;
  month?: number; // 1-12
  title: string;
  description: string;
  type: TimelineEventType;
  icon?: string;
  tags?: string[];
}

export type TimelineEventType =
  | 'education'
  | 'work'
  | 'project'
  | 'achievement'
  | 'learning'
  | 'milestone';

/**
 * Social media and contact links
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

/**
 * Personal information
 */
export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  avatar?: string;
  bio: string;
  manifesto?: string;

  // Current status
  availability: AvailabilityStatus;
  currentlyLearning: string[];
  careerGoals?: string;

  // Social links
  socials: SocialLink[];

  // Education
  education: Education[];
}

export type AvailabilityStatus = 'available' | 'open-to-freelance' | 'busy' | 'not-available';

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  status: 'in-progress' | 'completed';
  startYear: number;
  endYear?: number;
  expectedGraduation?: string;
  achievements?: string[];
}

/**
 * Metrics for the fun dashboard
 */
export interface Metric {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  icon: string;
  description?: string;
  isReal?: boolean; // Whether this is real data or a joke/estimate
  trend?: 'up' | 'down' | 'stable';
}

/**
 * Navigation item
 */
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  description?: string;
  external?: boolean;
}

/**
 * Command palette action
 */
export interface CommandAction {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action: () => void | Promise<void>;
  keywords?: string[]; // For search
  category?: string;
}
