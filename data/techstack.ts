/**
 * Tech Stack Data
 * Technologies, tools, and skills with detailed information
 */

export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'cloud' | 'database' | 'tools';
  size: 'large' | 'medium' | 'small';
  icon: string; // Will use simple-icons or custom SVG
  color: string; // Brand color
  proficiency: number; // 0-100
  yearsOfExperience: string;

  // For modal content
  capabilities: string[];
  personality: string;
  favoriteFeature?: string;
  usedIn?: string[];
  achievement?: string;
  status?: 'expert' | 'learning' | 'favorite';
}

export const techStack: TechItem[] = [
  // LARGE CARDS - Featured Strengths
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    size: 'large',
    icon: 'laravel',
    color: '#FF2D20',
    proficiency: 90,
    yearsOfExperience: '3+ years',
    capabilities: [
      'REST API Development & Authentication',
      'Real-time Notifications with Broadcasting',
      'Database Optimization & Query Performance',
      'Payment Gateway Integrations',
      'Job Queues & Background Processing',
      'Middleware & Authorization',
    ],
    personality: 'My PHP powerhouse - built systems serving 3,000+ users with elegance',
    favoriteFeature: 'Eloquent ORM makes database work a breeze',
    usedIn: ['CampusConnect LMS', 'Pharmacy Management System', 'E-commerce Platforms'],
    achievement: 'Reduced database query time by 70% using eager loading',
    status: 'expert',
  },
  {
    id: 'react',
    name: 'React & Next.js',
    category: 'frontend',
    size: 'large',
    icon: 'react',
    color: '#61DAFB',
    proficiency: 85,
    yearsOfExperience: '3+ years',
    capabilities: [
      'Component-Based Architecture',
      'Server-Side Rendering (SSR) with Next.js',
      'React Hooks & Custom Hooks',
      'State Management (Context, Zustand)',
      'API Routes & Serverless Functions',
      'Performance Optimization',
    ],
    personality: 'Where UIs come alive - from simple sites to complex dashboards',
    favoriteFeature: 'Hooks changed everything. Class components? Never heard of her.',
    usedIn: ['Portfolio Website', 'Admin Dashboards', 'Landing Pages'],
    achievement: 'Improved Lighthouse score from 65 to 95 with SSR',
    status: 'expert',
  },
  {
    id: 'vue',
    name: 'Vue.js & Nuxt.js',
    category: 'frontend',
    size: 'large',
    icon: 'vuedotjs',
    color: '#4FC08D',
    proficiency: 88,
    yearsOfExperience: '3+ years',
    capabilities: [
      'Composition API & Reactivity',
      'SSR & SEO Optimization with Nuxt',
      'Component Libraries & Design Systems',
      'Vuex/Pinia State Management',
      'Progressive Web Apps (PWA)',
      'Performance Tuning',
    ],
    personality: 'The elegant framework - CampusConnect\'s secret weapon',
    favoriteFeature: 'Composition API is chef\'s kiss for code organization',
    usedIn: ['CampusConnect Admin Panel', 'Client Dashboards'],
    achievement: '60% improvement in Time to First Byte with Nuxt SSR',
    status: 'expert',
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS',
    category: 'frontend',
    size: 'large',
    icon: 'tailwindcss',
    color: '#06B6D4',
    proficiency: 92,
    yearsOfExperience: '3+ years',
    capabilities: [
      'Utility-First CSS Architecture',
      'Custom Design Systems & Themes',
      'Responsive Design (Mobile-First)',
      'Dark Mode Implementation',
      'Animation & Transitions',
      'Component Styling Patterns',
    ],
    personality: 'Goodbye writing custom CSS for everything. Hello productivity!',
    favoriteFeature: 'JIT compiler + arbitrary values = unlimited power',
    usedIn: ['Every project since 2021'],
    achievement: 'Built entire design system in under a week',
    status: 'favorite',
  },

  // MEDIUM CARDS - Strong Skills
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    size: 'medium',
    icon: 'nodedotjs',
    color: '#339933',
    proficiency: 80,
    yearsOfExperience: '3+ years',
    capabilities: [
      'RESTful API Development',
      'Express.js Server Setup',
      'Real-time with Socket.io',
      'Database Integration',
      'Authentication & JWT',
    ],
    personality: 'JavaScript everywhere - backend made simple',
    usedIn: ['API Services', 'Real-time Features'],
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'devops',
    size: 'medium',
    icon: 'git',
    color: '#F05032',
    proficiency: 88,
    yearsOfExperience: '4+ years',
    capabilities: [
      'Version Control & Branching Strategies',
      'Code Review & Pull Requests',
      'Merge Conflict Resolution',
      'Git Workflows (Gitflow, Trunk-based)',
      'GitHub Actions CI/CD',
    ],
    personality: 'My best friend since the hard drive crash of 2022. Never again.',
    favoriteFeature: 'Cherry-pick is pure magic for selective commits',
    achievement: '500+ commits in a single year',
    status: 'expert',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    size: 'medium',
    icon: 'docker',
    color: '#2496ED',
    proficiency: 75,
    yearsOfExperience: '1+ year',
    capabilities: [
      'Container Creation & Management',
      'Docker Compose Multi-Container Apps',
      'Dockerfile Optimization',
      'Container Orchestration Basics',
      'Development Environment Setup',
    ],
    personality: '"It works on my machine" jokes became history',
    achievement: 'Reduced deployment time from 45min to 3min',
    status: 'learning',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    size: 'medium',
    icon: 'amazonaws',
    color: '#FF9900',
    proficiency: 70,
    yearsOfExperience: '2+ years',
    capabilities: [
      'EC2 Instance Management',
      'S3 Bucket Storage & Optimization',
      'CloudFront CDN Setup',
      'Cost Optimization Strategies',
      'Basic VPC & Security Groups',
    ],
    personality: 'Cloud infrastructure that scales - currently obsessed',
    achievement: 'Reduced hosting costs by 40% with optimization',
    status: 'learning',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'devops',
    size: 'medium',
    icon: 'kubernetes',
    color: '#326CE5',
    proficiency: 65,
    yearsOfExperience: '6 months',
    capabilities: [
      'K3s Cluster Setup & Management',
      'Pod & Deployment Configuration',
      'Service Networking Basics',
      'Container Orchestration',
      'Homelab Experimentation',
    ],
    personality: 'Currently running a homelab with 3 Raspberry Pis - the future!',
    status: 'learning',
  },

  // SMALL CARDS - Tools & Complementary Tech
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    size: 'small',
    icon: 'typescript',
    color: '#3178C6',
    proficiency: 82,
    yearsOfExperience: '2+ years',
    capabilities: ['Type Safety', 'Interface Design', 'Generic Types'],
    personality: 'Making JavaScript behave since 2022',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    size: 'small',
    icon: 'javascript',
    color: '#F7DF1E',
    proficiency: 90,
    yearsOfExperience: '5+ years',
    capabilities: ['ES6+ Features', 'Async/Await', 'DOM Manipulation'],
    personality: 'The foundation of everything I build',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'tools',
    size: 'small',
    icon: 'python',
    color: '#3776AB',
    proficiency: 75,
    yearsOfExperience: '3+ years',
    capabilities: ['Automation Scripts', 'Web Scraping', 'Data Processing'],
    personality: 'My go-to for automation and scripts',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    size: 'small',
    icon: 'mysql',
    color: '#4479A1',
    proficiency: 85,
    yearsOfExperience: '4+ years',
    capabilities: ['Query Optimization', 'Database Design', 'Indexing'],
    personality: 'Reliable data storage for production apps',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    size: 'small',
    icon: 'postgresql',
    color: '#4169E1',
    proficiency: 78,
    yearsOfExperience: '2+ years',
    capabilities: ['Advanced Queries', 'JSON Support', 'Performance Tuning'],
    personality: 'When you need advanced database features',
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    size: 'small',
    icon: 'php',
    color: '#777BB4',
    proficiency: 88,
    yearsOfExperience: '4+ years',
    capabilities: ['Modern PHP 8+', 'OOP Patterns', 'Server-Side Logic'],
    personality: 'Laravel\'s backbone - powerful and misunderstood',
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    category: 'frontend',
    size: 'small',
    icon: 'html5',
    color: '#E34F26',
    proficiency: 95,
    yearsOfExperience: '6+ years',
    capabilities: ['Semantic HTML', 'CSS Grid/Flexbox', 'Responsive Design'],
    personality: 'Where it all started - 2018 Comic Sans days',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'cloud',
    size: 'small',
    icon: 'cloudflare',
    color: '#F38020',
    proficiency: 80,
    yearsOfExperience: '2+ years',
    capabilities: ['CDN Setup', 'DNS Management', 'DDoS Protection'],
    personality: 'Fast, secure, and reliable CDN',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'tools',
    size: 'small',
    icon: 'linux',
    color: '#FCC624',
    proficiency: 78,
    yearsOfExperience: '2+ years',
    capabilities: ['System Administration', 'Shell Scripting', 'Server Management'],
    personality: 'Living in the terminal - the DevOps way',
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    category: 'devops',
    size: 'small',
    icon: 'githubactions',
    color: '#2088FF',
    proficiency: 76,
    yearsOfExperience: '2+ years',
    capabilities: ['GitHub Actions', 'Automated Testing', 'Deployment Pipelines'],
    personality: 'No more manual deployments - automation FTW',
  },
  {
    id: 'c-cpp',
    name: 'C/C++',
    category: 'backend',
    size: 'small',
    icon: 'cplusplus',
    color: '#00599C',
    proficiency: 70,
    yearsOfExperience: '4+ years',
    capabilities: ['Memory Management', 'Data Structures', 'Algorithm Design'],
    personality: 'Debugging segfaults taught me patience and precision',
  },
];

/**
 * Get technologies by category
 */
export function getTechByCategory(category: TechItem['category']): TechItem[] {
  return techStack.filter((tech) => tech.category === category);
}

/**
 * Get technologies by size
 */
export function getTechBySize(size: TechItem['size']): TechItem[] {
  return techStack.filter((tech) => tech.size === size);
}

/**
 * Get featured technologies (large cards)
 */
export function getFeaturedTech(): TechItem[] {
  return getTechBySize('large');
}

/**
 * Tech stack statistics
 */
export const techStats = {
  totalTechnologies: techStack.length,
  expertLevel: techStack.filter((t) => t.proficiency >= 85).length,
  categories: Array.from(new Set(techStack.map((t) => t.category))).length,
  averageProficiency: Math.round(
    techStack.reduce((sum, t) => sum + t.proficiency, 0) / techStack.length
  ),
};
