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
    title: 'Discovered Web Development at 16',
    description: 'Built my first webpage using HTML - it was a simple "About Me" page with Comic Sans and rainbow colors. It was terrible, but I was hooked. Spent nights reading W3Schools and experimenting with code.',
    type: 'learning',
    icon: 'code',
    tags: ['html', 'beginning'],
  },
  {
    id: 'expand-skills-2019',
    year: 2019,
    title: 'Mastered Core Web Technologies',
    description:
      'Dove deep into CSS for styling, JavaScript for interactivity, and Java for OOP concepts. Built 10+ practice websites including a calculator, to-do list, and portfolio site. Finally understood the "cascade" in CSS after countless debugging sessions.',
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
    title: 'Unlocked Backend Development',
    description:
      'Learned PHP, C, and C++ to understand the server side of web applications. Built my first database-driven application - a simple blog with user authentication. Debugging segmentation faults in C taught me patience and precision.',
    type: 'learning',
    icon: 'server',
    tags: ['php', 'c', 'cpp', 'backend'],
  },
  {
    id: 'enroll-college-2020',
    year: 2020,
    month: 9,
    title: 'Started College Journey at Colegio De Montalban',
    description:
      'Enrolled in Bachelor of Science in Information Technology. Set a goal to maintain Latin honors while building real-world projects. Balanced academics with hands-on learning - theory in class, practice at night.',
    type: 'education',
    icon: 'school',
    tags: ['education', 'college', 'bsit'],
  },
  {
    id: 'start-freelancing-2020',
    year: 2020,
    month: 10,
    title: 'First Freelance Client - Website Redesign',
    description:
      'Landed my first paid client project - redesigning a local business website. Charged too little, worked too much, but learned invaluable lessons about client communication, deadlines, and professional web development. This marked the beginning of 4+ years of freelancing.',
    type: 'work',
    icon: 'briefcase',
    tags: ['freelance', 'ui-ux', 'design', 'work'],
  },
  {
    id: 'modern-stack-2021',
    year: 2021,
    title: 'Embraced Modern Web Development Stack',
    description:
      'Discovered TailwindCSS and fell in love with utility-first CSS - goodbye writing custom CSS for everything! Learned Python for automation scripts and web scraping. Added smooth animations to websites using Framer Motion and GSAP, making UIs feel alive.',
    type: 'learning',
    icon: 'sparkles',
    tags: ['python', 'tailwindcss', 'animation'],
  },
  {
    id: 'first-project-2021',
    year: 2021,
    month: 8,
    title: 'Launched First Production System - Inventory Manager',
    description:
      'Built a full-stack inventory management system for a small retail business. Features included real-time stock tracking, low-stock alerts, and sales reporting. Reduced their inventory management time from 5 hours to 30 minutes daily. First time experiencing the joy of users saying "this changed how we work."',
    type: 'project',
    icon: 'rocket',
    tags: ['project', 'inventory', 'milestone'],
  },
  {
    id: 'frontend-frameworks-2022',
    year: 2022,
    title: 'Became a Full-Stack Developer',
    description:
      'Dove into React and Vue.js - spent weeks wrapping my head around virtual DOM and reactivity. Built a task manager in React that taught me component architecture the hard way. Added Node.js and Spring Boot to handle backend APIs. Finally felt confident calling myself "full-stack."',
    type: 'learning',
    icon: 'layers',
    tags: ['react', 'vue', 'springboot', 'nodejs', 'fullstack'],
  },
  {
    id: 'git-mastery-2022',
    year: 2022,
    month: 6,
    title: 'Git Became My Best Friend',
    description:
      'After losing code to a hard drive crash (painful lesson), I went all-in on Git. Learned branching, merging, rebasing, and the magic of cherry-pick. Made 500+ commits that year. Started contributing to open-source projects and understanding professional development workflows.',
    type: 'learning',
    icon: 'git-branch',
    tags: ['git', 'github', 'version-control'],
  },
  {
    id: 'production-stack-2023',
    year: 2023,
    month: 1,
    title: 'Leveled Up to Production-Grade Development',
    description:
      'Learned Laravel and Next.js for building robust, scalable applications. Discovered the power of CI/CD pipelines - no more manual deployments! Started using AWS and Cloudflare for hosting and CDN. Reduced deployment time from 2 hours of manual work to 5 minutes automated. This was when I realized I loved DevOps.',
    type: 'learning',
    icon: 'cloud',
    tags: ['laravel', 'cicd', 'cloudflare', 'aws', 'nextjs', 'devops'],
  },
  {
    id: 'start-campusconnect-2023',
    year: 2023,
    month: 2,
    title: 'Started CampusConnect - My Biggest Challenge Yet',
    description:
      'Began developing a comprehensive Learning Management System for public high schools in our province. The goal: serve 3,000+ students, teachers, and administrators. This project would push me beyond anything I had built before. Initial meetings with school administrators were eye-opening - they needed everything from attendance to grade management.',
    type: 'project',
    icon: 'flag',
    tags: ['campusconnect', 'lms', 'major-project'],
  },
  {
    id: 'nuxt-learning-2024',
    year: 2024,
    title: 'Mastered Server-Side Rendering with Nuxt.js',
    description:
      'Learned Nuxt.js to improve CampusConnect\'s SEO and initial load performance. Migrated parts of the admin panel to SSR - saw a 60% improvement in Time to First Byte. Google Lighthouse scores jumped from 65 to 95. SEO and performance optimization became my new obsession.',
    type: 'learning',
    icon: 'zap',
    tags: ['nuxtjs', 'vue', 'ssr'],
  },
  {
    id: 'campus-development-2024',
    year: 2024,
    title: 'Became a DevOps Enthusiast',
    description:
      'Implemented comprehensive DevOps workflows for CampusConnect: automated testing with PHPUnit and Jest, CI/CD with GitHub Actions, monitoring with Sentry and UptimeRobot, and infrastructure as code. Reduced bugs reaching production by 80%. Deployment frequency increased from once a month to multiple times per week.',
    type: 'learning',
    icon: 'settings',
    tags: ['devops', 'automation', 'monitoring'],
  },
  {
    id: 'team-leadership-2024',
    year: 2024,
    month: 6,
    title: 'Led Capstone Project Team of 5 Developers',
    description:
      'Became team leader for our college capstone project. Managed 5 developers, conducted code reviews, handled sprint planning, and mediated technical disagreements. Learned that leadership is less about being the best coder and more about enabling others to do their best work. We delivered on time with 95% of features implemented.',
    type: 'achievement',
    icon: 'users',
    tags: ['leadership', 'teamwork', 'capstone'],
  },
  {
    id: 'docker-learning-2025',
    year: 2025,
    month: 1,
    title: 'Containerization Simplified Everything',
    description:
      'Learned Docker and containerized CampusConnect\'s microservices. "It works on my machine" jokes became a thing of the past. Created docker-compose setup that lets new developers spin up the entire stack in 2 commands. Deployment time dropped from 45 minutes to 3 minutes. Docker became my favorite tool.',
    type: 'learning',
    icon: 'box',
    tags: ['docker', 'containerization', 'devops'],
  },
  {
    id: 'campus-launch-2025',
    year: 2025,
    month: 6,
    title: 'CampusConnect Launched to 3,000+ Users! 🚀',
    description:
      'After 2+ years of development, CampusConnect went live across multiple public high schools. Launch night, I stayed up until 3 AM monitoring servers and logs. First 24 hours: 3,000+ users signed up, zero downtime, and principals calling to thank us. Reduced admin paperwork by 70%, saving teachers 15+ hours per week. This is why I code - to make real impact.',
    type: 'milestone',
    icon: 'trophy',
    tags: ['campusconnect', 'launch', 'production', 'achievement'],
  },
  {
    id: 'maintained-honors-2025',
    year: 2025,
    month: 12,
    title: 'Maintained Latin Honors for 5+ Years',
    description:
      'Kept Latin honors academic standing throughout college while freelancing and building CampusConnect. Late nights were split between studying data structures and debugging production issues. Proved to myself that you can excel both academically and professionally - it just requires discipline, coffee, and good time management.',
    type: 'achievement',
    icon: 'star',
    tags: ['academic', 'achievement', 'excellence'],
  },
  {
    id: 'current-learning-2026',
    year: 2026,
    month: 1,
    title: 'Currently Mastering: Linux, Kubernetes & AWS',
    description:
      'Deep-diving into cloud-native technologies. Setting up Kubernetes clusters, earning AWS certifications, and living in the terminal with Linux system administration. Goal: become a cloud architect who can design and deploy scalable infrastructure. Currently running a homelab with 3 Raspberry Pis running K3s.',
    type: 'learning',
    icon: 'trending-up',
    tags: ['linux', 'kubernetes', 'aws', 'current'],
  },
  {
    id: 'fourth-year-2026',
    year: 2026,
    month: 1,
    title: '4th Year BSIT Student - Final Semester',
    description:
      'In the home stretch! Final semester of my Bachelor\'s degree. Balancing thesis completion, job hunting, and continuous learning. Excited and nervous about transitioning from student developer to professional software engineer. The journey from "Hello World" in 2018 to deploying systems serving thousands has been incredible.',
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
