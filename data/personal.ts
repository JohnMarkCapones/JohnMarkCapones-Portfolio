/**
 * Personal Information Data
 * Profile, education, social links, and current status
 */

import type { PersonalInfo, SocialLink, Education, Metric } from '@/types';

/**
 * Social Media Links
 */
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/JohnMarkCapones',
    icon: 'github',
    username: 'JohnMarkCapones',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/john-mark-capones-66b6b8255/',
    icon: 'linkedin',
    username: 'john-mark-capones',
  },
  {
    name: 'Email',
    url: 'mailto:johnmarkcapones1@gmail.com',
    icon: 'mail',
    username: 'johnmarkcapones1@gmail.com',
  },
];

/**
 * Education History
 */
export const education: Education[] = [
  {
    institution: 'Colegio De Montalban',
    degree: 'Bachelor of Science in Information Technology',
    field: 'Information Technology',
    status: 'in-progress',
    startYear: 2020,
    expectedGraduation: 'June 2026',
    achievements: [
      'Latin Honors (consistently maintained)',
      'Academic excellence while managing freelance work',
      'Capstone project team leader',
    ],
  },
  {
    institution: 'Senior High School',
    degree: 'High School Diploma',
    status: 'completed',
    startYear: 2018,
    endYear: 2020,
    achievements: ['High Honors', 'Best Web Programmer Award'],
  },
];

/**
 * Personal Information
 */
export const personalInfo: PersonalInfo = {
  name: 'John Mark Capones',
  title: 'Aspiring Developer | DevOps & Cloud Engineer | 4th Year BSIT Student',
  location: 'Rodriguez, Rizal, Philippines',
  email: 'johnmarkcapones1@gmail.com',
  phone: '09512858784',
  website: 'https://capdev.tech',
  bio: 'Results-driven IT student with extensive hands-on experience in full-stack development, DevOps, cloud engineering, and AI integration. Skilled in designing, deploying, and maintaining scalable, secure, and accessible systems for enterprise-grade and public sector projects.',
  manifesto:
    'I build systems that scale and solutions that matter. I derive satisfaction from being a developer and solving real problems with technology. Cloud and DevOps fascinate me because they bridge the gap between code and impact, enabling automation and scalable infrastructure. My approach prioritizes performance, SEO, accessibility, and security, guided by industry best practices. I believe in building systems that endure—not demos that break.',

  availability: 'open-to-freelance',
  currentlyLearning: ['Linux System Administration', 'Kubernetes', 'Advanced Laravel', 'AWS'],
  careerGoals:
    'Become a software developer with a focus on Cloud and DevOps engineering. Seeking opportunities to work on scalable infrastructure, automation pipelines, and cloud-native applications.',

  socials: socialLinks,
  education,
};

/**
 * Fun Metrics Dashboard Data
 */
export const metricsData: Metric[] = [
  {
    id: 'energy-drinks',
    label: 'Energy Drinks Consumed',
    value: 730,
    unit: 'cans',
    icon: 'zap',
    description: 'Approximately 2 per day (coffee is overrated!)',
    isReal: false,
  },
  {
    id: 'lines-of-code',
    label: 'Lines of Code Written',
    value: '150,000+',
    icon: 'code',
    description: 'Across all projects and languages',
    isReal: false,
    trend: 'up',
  },
  {
    id: 'bugs-created',
    label: 'Bugs Created',
    value: '2,156',
    icon: 'bug',
    description: "We don't talk about this",
    isReal: false,
  },
  {
    id: 'bugs-fixed',
    label: 'Bugs Squashed',
    value: '1,834',
    icon: 'check',
    description: 'Getting better at this!',
    isReal: false,
    trend: 'up',
  },
  {
    id: 'projects-deployed',
    label: 'Projects Deployed',
    value: 12,
    icon: 'rocket',
    description: '11 live, 1 in development',
    isReal: true,
    trend: 'up',
  },
  {
    id: 'technologies-learned',
    label: 'Technologies Learned',
    value: 28,
    icon: 'layers',
    description: 'Currently mastering #29 (Kubernetes)',
    isReal: true,
  },
  {
    id: 'stackoverflow-visits',
    label: 'Stack Overflow Visits',
    value: '4,892',
    icon: 'help-circle',
    description: 'Still visiting daily',
    isReal: false,
  },
  {
    id: 'documentation-pages',
    label: 'Documentation Pages Read',
    value: '8,000+',
    icon: 'book',
    description: 'MDN, AWS Docs, React Docs, Laravel Docs...',
    isReal: false,
  },
  {
    id: 'vscode-hours',
    label: 'Time in VS Code',
    value: '2,847',
    unit: 'hours',
    icon: 'clock',
    description: "That's 118 days of your life!",
    isReal: false,
  },
  {
    id: 'github-streak',
    label: 'GitHub Longest Streak',
    value: 89,
    unit: 'days',
    icon: 'git-branch',
    description: 'Consistent contribution habit',
    isReal: false,
    trend: 'up',
  },
  {
    id: 'late-night-commits',
    label: 'Late Night Commits',
    value: '60%',
    icon: 'moon',
    description: 'Night owl developer detected (11pm - 3am)',
    isReal: false,
  },
  {
    id: 'npm-packages',
    label: 'NPM Packages Installed',
    value: '12,847',
    icon: 'package',
    description: 'node_modules jokes are real',
    isReal: false,
  },
  {
    id: 'build-errors',
    label: 'Build Errors Encountered',
    value: '5,892',
    icon: 'alert-circle',
    description: 'And counting...',
    isReal: false,
  },
  {
    id: 'kpop-hours',
    label: 'K-pop Coding Hours',
    value: '1,200+',
    unit: 'hours',
    icon: 'music',
    description: 'K-pop and anime soundtracks fuel productivity',
    isReal: false,
  },
  {
    id: 'volleyball-breaks',
    label: 'Volleyball Breaks',
    value: 156,
    icon: 'circle',
    description: 'Staying active between coding sessions',
    isReal: false,
  },
  {
    id: 'active-users',
    label: 'CampusConnect Users',
    value: '3,000+',
    icon: 'users',
    description: 'Real production users served',
    isReal: true,
    trend: 'up',
  },
];

/**
 * Get metrics by category
 */
export function getRealMetrics(): Metric[] {
  return metricsData.filter((metric) => metric.isReal);
}

export function getFunMetrics(): Metric[] {
  return metricsData.filter((metric) => !metric.isReal);
}

/**
 * Current Status Information
 */
export const currentStatus = {
  role: '4th Year BSIT Student',
  institution: 'Colegio De Montalban',
  expectedGraduation: 'June 2026',
  academicStanding: 'Latin Honors',
  availability: 'Open for freelance opportunities (15-20 hrs/week)',
  currentFocus: [
    'Learning Kubernetes and container orchestration',
    'Mastering AWS cloud services',
    'Building this portfolio',
    'Completing final year of BSIT',
  ],
  openTo: [
    'Freelance web development projects',
    'Cloud/DevOps consulting',
    'Full-stack development work',
    'Internship opportunities',
  ],
  careerInterests: [
    'Software Developer (Full-Stack)',
    'DevOps Engineer',
    'Cloud Engineer',
    'Backend Developer',
    'Site Reliability Engineer (SRE)',
  ],
};

/**
 * Skills Summary (High-level overview)
 */
export const skillsSummary = {
  experience: '4-5 years (including freelance)',
  specializations: ['Full-Stack Development', 'DevOps', 'Cloud Engineering', 'System Architecture'],
  topSkills: [
    'Next.js',
    'React',
    'Laravel',
    'NestJS',
    'PostgreSQL',
    'Supabase',
    'TailwindCSS',
    'Git',
    'Cloudflare',
    'GitHub Actions',
  ],
  learning: ['Kubernetes', 'Linux', 'AWS (Advanced)', 'System Design'],
  languages: ['PHP', 'JavaScript', 'TypeScript', 'Python', 'C#', 'SQL'],
};

/**
 * Achievements Summary
 */
export const achievements = [
  {
    title: 'CampusConnect Launch',
    description: 'Successfully deployed system serving 3,000+ users',
    date: 'November 2025',
    impact: '99.9% uptime, < 2s page loads',
  },
  {
    title: 'Latin Honors',
    description: 'Maintained academic excellence throughout college',
    date: '2020 - Present',
    impact: 'Consistent high performance while freelancing',
  },
  {
    title: 'Best Web Programmer Award',
    description: 'Recognized for excellence in web development',
    date: '2020',
    impact: 'High school graduation award',
  },
  {
    title: 'Team Leadership',
    description: 'Led capstone project development team',
    date: '2024',
    impact: 'Successful project delivery and team coordination',
  },
  {
    title: 'Freelance Success',
    description: '4-5 years of professional freelance experience',
    date: '2020 - Present',
    impact: 'Multiple successful client projects delivered',
  },
];

/**
 * Personal Interests & Hobbies
 */
export const interests = {
  sports: ['Volleyball', 'Badminton'],
  tech: ['Hardware tech', 'PC building', 'Tech reviews'],
  entertainment: ['K-pop', 'Anime soundtracks'],
  reading: ['Tech blogs', 'Documentation', 'Tech news'],
  coding: {
    music: 'K-pop and anime soundtracks',
    beverage: 'Energy drinks (2/day)',
    time: 'Late night (11pm - 3am)',
    location: 'Home office',
  },
};
