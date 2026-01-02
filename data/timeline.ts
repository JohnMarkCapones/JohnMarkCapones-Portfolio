/**
 * Timeline Data
 * Professional journey and key milestones
 */

import type { TimelineEvent } from '@/types';

/**
 * Timeline Events
 * Chronological journey from 2018 to present
 */
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'start-coding-2018',
    year: 2018,
    title: 'Started Learning HTML',
    description: 'First introduction to web development and programming.',
    type: 'learning',
    icon: 'code',
    tags: ['html', 'beginning'],
  },
  {
    id: 'expand-skills-2019',
    year: 2019,
    title: 'Learned HTML, CSS, JavaScript, and Java',
    description:
      'Expanded skills to include styling with CSS, interactivity with JavaScript, and object-oriented programming with Java. Built first basic websites.',
    type: 'learning',
    icon: 'book',
    tags: ['html', 'css', 'javascript', 'java'],
  },
  {
    id: 'graduate-shs-2020',
    year: 2020,
    month: 6,
    title: 'Graduated Senior High School with High Honors',
    description:
      'Graduated with high honors and received Best Web Programmer award, recognizing excellence in web development skills.',
    type: 'achievement',
    icon: 'award',
    tags: ['education', 'achievement', 'award'],
  },
  {
    id: 'backend-learning-2020',
    year: 2020,
    month: 8,
    title: 'Learned C, C++, PHP, and Backend Fundamentals',
    description:
      'Dove into backend development with PHP and systems programming with C/C++. Understanding of server-side logic and database integration.',
    type: 'learning',
    icon: 'server',
    tags: ['php', 'c', 'cpp', 'backend'],
  },
  {
    id: 'enroll-college-2020',
    year: 2020,
    month: 9,
    title: 'Enrolled at Colegio De Montalban (BSIT)',
    description:
      'Started Bachelor of Science in Information Technology program. Committed to maintaining Latin honors throughout college.',
    type: 'education',
    icon: 'school',
    tags: ['education', 'college', 'bsit'],
  },
  {
    id: 'start-freelancing-2020',
    year: 2020,
    month: 10,
    title: 'Started Freelancing as Website Designer/UI-UX',
    description:
      'Began professional freelance career designing and developing websites for clients. Built foundation for 4+ years of freelance experience.',
    type: 'work',
    icon: 'briefcase',
    tags: ['freelance', 'ui-ux', 'design', 'work'],
  },
  {
    id: 'modern-stack-2021',
    year: 2021,
    title: 'Learned Python, TailwindCSS, and Website Animations',
    description:
      'Expanded skills to include Python scripting, modern CSS framework (TailwindCSS), and advanced web animations for better user experiences.',
    type: 'learning',
    icon: 'sparkles',
    tags: ['python', 'tailwindcss', 'animation'],
  },
  {
    id: 'first-project-2021',
    year: 2021,
    month: 8,
    title: 'Built First Real Project: Inventory Management Website',
    description:
      'Developed first production-level project - a comprehensive inventory management system. Marked transition from learning to building real solutions.',
    type: 'project',
    icon: 'rocket',
    tags: ['project', 'inventory', 'milestone'],
  },
  {
    id: 'frontend-frameworks-2022',
    year: 2022,
    title: 'Learned React, Vue, Java Spring Boot, Node.js',
    description:
      'Deep dive into modern frontend frameworks (React, Vue) and backend technologies (Spring Boot, Node.js). Became full-stack developer.',
    type: 'learning',
    icon: 'layers',
    tags: ['react', 'vue', 'springboot', 'nodejs', 'fullstack'],
  },
  {
    id: 'git-mastery-2022',
    year: 2022,
    month: 6,
    title: 'Mastered Git and GitHub Workflow',
    description:
      'Adopted professional version control practices. Learned branching strategies, collaboration workflows, and open-source contribution.',
    type: 'learning',
    icon: 'git-branch',
    tags: ['git', 'github', 'version-control'],
  },
  {
    id: 'production-stack-2023',
    year: 2023,
    month: 1,
    title: 'Learned Laravel, CI/CD, Cloudflare, AWS, Next.js',
    description:
      'Mastered production deployment strategies, cloud infrastructure (Cloudflare, AWS), and modern full-stack framework (Next.js). Prepared for enterprise projects.',
    type: 'learning',
    icon: 'cloud',
    tags: ['laravel', 'cicd', 'cloudflare', 'aws', 'nextjs', 'devops'],
  },
  {
    id: 'start-campusconnect-2023',
    year: 2023,
    month: 2,
    title: 'Started CampusConnect Project',
    description:
      'Began development of flagship project - comprehensive LMS/CMS for public high schools. Most ambitious project to date, targeting 3,000+ users.',
    type: 'project',
    icon: 'flag',
    tags: ['campusconnect', 'lms', 'major-project'],
  },
  {
    id: 'nuxt-learning-2024',
    year: 2024,
    title: 'Learned Nuxt.js for Vue SSR Applications',
    description:
      'Expanded Vue.js knowledge with Nuxt.js for server-side rendering and static site generation. Enhanced SEO and performance capabilities.',
    type: 'learning',
    icon: 'zap',
    tags: ['nuxtjs', 'vue', 'ssr'],
  },
  {
    id: 'campus-development-2024',
    year: 2024,
    title: 'Deepened DevOps Practices',
    description:
      'Implemented advanced DevOps workflows for CampusConnect including automated testing, CI/CD pipelines, monitoring, and infrastructure as code.',
    type: 'learning',
    icon: 'settings',
    tags: ['devops', 'automation', 'monitoring'],
  },
  {
    id: 'team-leadership-2024',
    year: 2024,
    month: 6,
    title: 'Led Development Team for Capstone Project',
    description:
      'Took leadership role in capstone project team. Managed task delegation, code reviews, and project delivery. Enhanced team collaboration skills.',
    type: 'achievement',
    icon: 'users',
    tags: ['leadership', 'teamwork', 'capstone'],
  },
  {
    id: 'docker-learning-2025',
    year: 2025,
    month: 1,
    title: 'Learned Docker Containerization',
    description:
      'Mastered Docker for creating consistent development and deployment environments. Implemented containerization for CampusConnect services.',
    type: 'learning',
    icon: 'box',
    tags: ['docker', 'containerization', 'devops'],
  },
  {
    id: 'campus-launch-2025',
    year: 2025,
    month: 11,
    title: 'CampusConnect Launched - 3,000+ Users',
    description:
      'Successfully launched CampusConnect to production. System now serves 3,000+ students, teachers, and administrators with 99.9% uptime. Major milestone achievement.',
    type: 'milestone',
    icon: 'trophy',
    tags: ['campusconnect', 'launch', 'production', 'achievement'],
  },
  {
    id: 'maintained-honors-2025',
    year: 2025,
    month: 12,
    title: 'Maintained Latin Honors Throughout College',
    description:
      'Consistently maintained Latin honors academic standing while managing freelance work and major projects. Balance of excellence in academics and professional work.',
    type: 'achievement',
    icon: 'star',
    tags: ['academic', 'achievement', 'excellence'],
  },
  {
    id: 'current-learning-2025',
    year: 2025,
    month: 12,
    title: 'Currently Learning: Linux, Kubernetes, AWS',
    description:
      'Actively expanding cloud and DevOps expertise with Linux system administration, Kubernetes container orchestration, and advanced AWS services.',
    type: 'learning',
    icon: 'trending-up',
    tags: ['linux', 'kubernetes', 'aws', 'current'],
  },
  {
    id: 'fourth-year-2025',
    year: 2025,
    month: 12,
    title: '4th Year BSIT Student',
    description:
      'Currently in final year of Bachelor of Science in Information Technology. Preparing for graduation and career transition to professional software development.',
    type: 'education',
    icon: 'graduation-cap',
    tags: ['education', 'current', '4th-year'],
  },
  {
    id: 'expected-graduation-2026',
    year: 2026,
    month: 6,
    title: 'Expected Graduation',
    description:
      'Anticipated graduation from Colegio De Montalban with BSIT degree. Ready to transition to full-time software development role with focus on Cloud and DevOps.',
    type: 'milestone',
    icon: 'flag',
    tags: ['graduation', 'future', 'career'],
  },
];

/**
 * Get timeline events by type
 */
export function getEventsByType(type: TimelineEvent['type']): TimelineEvent[] {
  return timelineEvents.filter((event) => event.type === type);
}

/**
 * Get timeline events by year
 */
export function getEventsByYear(year: number): TimelineEvent[] {
  return timelineEvents.filter((event) => event.year === year);
}

/**
 * Get timeline events by year range
 */
export function getEventsByYearRange(startYear: number, endYear: number): TimelineEvent[] {
  return timelineEvents.filter((event) => event.year >= startYear && event.year <= endYear);
}

/**
 * Get all unique years from timeline
 */
export function getAllYears(): number[] {
  const years = new Set(timelineEvents.map((event) => event.year));
  return Array.from(years).sort();
}

/**
 * Get current/latest event
 */
export function getCurrentEvent(): TimelineEvent {
  return timelineEvents[timelineEvents.length - 1] ?? timelineEvents[0]!;
}

/**
 * Get milestone events only
 */
export function getMilestones(): TimelineEvent[] {
  return timelineEvents.filter(
    (event) => event.type === 'milestone' || event.type === 'achievement'
  );
}

/**
 * Timeline Summary Stats
 */
export const timelineStats = {
  yearsOfExperience: new Date().getFullYear() - 2018,
  totalEvents: timelineEvents.length,
  achievements: getEventsByType('achievement').length,
  milestones: getEventsByType('milestone').length,
  projects: getEventsByType('project').length,
  learningEvents: getEventsByType('learning').length,
  educationEvents: getEventsByType('education').length,
};
