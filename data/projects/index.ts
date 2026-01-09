/**
 * Projects Data
 * Comprehensive portfolio of completed and active projects
 */

import type { Project } from '@/types';

/**
 * CampusConnect - Flagship Project
 * Comprehensive LMS/CMS for 3,000+ users
 */
export const campusConnect: Project = {
  id: 'campus-connect',
  slug: 'campus-connect',
  title: 'CampusConnect',
  tagline: 'Empowering Education Through Technology',
  description:
    'Comprehensive Learning Management System (LMS), Content Management System (CMS), and administrative platform for Rodriguez, Rizal public high schools serving 3,000+ users.',
  longDescription:
    'CampusConnect is a full-featured educational platform that revolutionizes how public schools in Rodriguez, Rizal manage students, teachers, schedules, events, clubs, learning materials, and communication. Built with modern web technologies and designed for scale, it handles 3,000+ active users with 99.9% uptime while maintaining exceptional performance and security.',
  featured: true,

  liveUrl: 'https://www.southville8bnhs.com/',
  githubUrl: 'https://github.com/JohnMarkCapones/Southville8B-NHS-Edge',

  techStack: [
    'Next.js',
    'React',
    'NestJS',
    'TypeScript',
    'Supabase',
    'PostgreSQL',
    'Cloudflare',
    'Render',
    'Docker',
    'TailwindCSS',
    'GSAP',
    'React Native',
    'C#',
  ],

  skills: [
    'Next.js',
    'React',
    'NestJS',
    'TypeScript',
    'Supabase',
    'PostgreSQL',
    'Cloudflare',
    'Render',
    'Docker',
    'GitHub Actions',
    'TailwindCSS',
    'GSAP',
    'React Native',
    'C#',
  ],

  role: {
    title: 'Full-Stack Developer & Team Lead',
    teamSize: 'Team of 5 developers',
    responsibilities: [
      'Led capstone team of 5 developers from ideation to production launch',
      'Architected full-stack system using Next.js, NestJS, and Supabase',
      'Designed and implemented PostgreSQL database schema with Row Level Security',
      'Built REST API backend with NestJS handling 3,000+ concurrent users',
      'Developed responsive frontend with Next.js and React, achieving 90+ Lighthouse score',
      'Implemented real-time features using WebSockets and Supabase subscriptions',
      'Created mobile app (React Native) and desktop app (C#) for cross-platform access',
      'Set up CI/CD pipeline with GitHub Actions and Docker containerization',
      'Managed project timeline, conducted code reviews, and sprint planning',
    ],
    contributions: [
      'Reduced deployment time from 45 minutes to 3 minutes with Docker automation',
      'Optimized database queries, achieving sub-100ms response times for complex queries',
      'Implemented comprehensive security measures including encryption and audit logging',
      'Designed anti-cheating system for quizzes, reducing incidents by 85%',
      'Achieved 99.9% uptime serving 3,000+ users with sub-2-second page loads',
    ],
  },

  timeline: {
    started: 'February 2023',
    launched: 'November 2025',
    duration: '2+ years',
  },

  images: [
    '/projects/campus-connect/dashboard.jpg',
    '/projects/campus-connect/monitoring-system.jpg',
    '/projects/campus-connect/student-management.jpg',
    '/projects/campus-connect/footer.jpg',
  ],

  status: 'live',

  users: 3000,

  metrics: [
    { label: 'Active Users', value: '3,000+', description: 'Students, teachers, and administrators' },
    { label: 'Uptime', value: '99.9%', description: 'High availability and reliability' },
    { label: 'Page Load Time', value: '< 2s', description: 'Average load time' },
    { label: 'Lighthouse Score', value: '90+', description: 'Mobile performance score' },
    { label: 'API Response Time', value: '< 300ms', description: 'Average API response' },
    { label: 'Database Queries', value: 'Optimized', description: 'Complex queries under 100ms' },
  ],

  features: [
    'Student Management System with profiles, enrollment, and academic records',
    'Teacher Management with class assignments and grade management',
    'Learning Management System with PDFs, PPTs, and video support',
    'Quiz System with advanced anti-cheating mechanisms (browser lock, tab detection)',
    'Club and Event Management with calendar integration',
    'News and Gallery Management for school announcements',
    'Building and Schedule Management for class organization',
    'AI-powered chatbot for navigation and assistance',
    'Real-time notifications and messaging system',
    'Role-Based Access Control (RBAC) with granular permissions',
    'Mobile app (React Native) for on-the-go access',
    'Desktop app (C#) for administrative tasks',
    'Advanced analytics and reporting dashboards',
    'SEO optimized with social media integration',
  ],

  challenges: [
    {
      title: 'Scaling to 3,000+ Concurrent Users',
      description:
        'Needed to ensure the system could handle thousands of users simultaneously without performance degradation, especially during peak hours like enrollment and exam periods.',
      solution:
        'Implemented comprehensive caching strategies with Cloudflare CDN, optimized database queries with proper indexing, utilized horizontal scaling capabilities, and implemented load balancing. Result: Maintained sub-2-second page loads even during peak traffic.',
    },
    {
      title: 'Data Security and Compliance',
      description:
        'Managing sensitive student and teacher data required enterprise-level security and compliance with data protection regulations.',
      solution:
        'Implemented ISO 27001-aligned practices including encryption at rest and in transit, comprehensive audit logging for all critical actions, Row Level Security (RLS) in Supabase, and strict data retention/deletion policies. Regular security audits and monitoring with Sentry and Datadog.',
    },
    {
      title: 'Offline Access for Poor Connectivity',
      description:
        'Many users in the area experience unreliable internet connectivity, requiring offline capabilities while maintaining data consistency.',
      solution:
        'Built Progressive Web App (PWA) features with service workers for offline caching, implemented local storage strategies with background sync, and created smart conflict resolution for when users come back online.',
    },
    {
      title: 'Anti-Cheating in Online Quizzes',
      description:
        'Preventing cheating in online assessments while maintaining a smooth user experience was critical for academic integrity.',
      solution:
        'Developed multi-layered anti-cheating system: randomized question order, time limits per question, browser lockdown mode (full-screen enforcement), tab-switching detection with warnings, screenshot prevention, and question pool randomization. Reduced cheating incidents by 85%.',
    },
    {
      title: 'Complex Permission Management',
      description:
        'Different user roles (students, teachers, admins, staff) required granular access control across multiple modules and features.',
      solution:
        'Implemented comprehensive Role-Based Access Control (RBAC) system with permission inheritance, module-level permissions, and action-based access control. Created admin interface for easy permission management without code changes.',
    },
  ],

  category: 'web-app',
  tags: [
    'LMS',
    'CMS',
    'Education',
    'Full-Stack',
    'Production',
    'Enterprise',
    'Mobile',
    'Desktop',
    'AI',
  ],
};

/**
 * Xiraya - E-Commerce Platform
 */
export const xiraya: Project = {
  id: 'xiraya',
  slug: 'xiraya',
  title: 'Xiraya',
  tagline: 'Modern E-Commerce Platform',
  description:
    'Full-featured e-commerce platform with modern architecture, built using Laravel backend and Nuxt.js frontend with MongoDB database.',
  longDescription:
    'Xiraya is a scalable e-commerce solution designed for modern online retail. Built with a separation of concerns using Laravel for robust backend API and Nuxt.js for performant, SEO-friendly frontend, the platform supports complete e-commerce workflows from product management to checkout.',
  featured: false,

  // liveUrl: Not deployed yet
  // githubUrl: Private repository

  techStack: ['Laravel', 'Nuxt.js', 'Vue.js', 'MongoDB', 'Docker', 'Cloudflare', 'TailwindCSS'],

  skills: ['Laravel', 'Nuxt.js', 'MongoDB', 'Docker', 'Cloudflare', 'TailwindCSS'],

  role: {
    title: 'Full-Stack Developer',
    teamSize: 'Solo project',
    responsibilities: [
      'Designed and built complete e-commerce platform from scratch',
      'Developed RESTful API backend using Laravel with MongoDB integration',
      'Created SEO-optimized frontend with Nuxt.js and Server-Side Rendering',
      'Implemented secure payment gateway integration with error handling',
      'Built admin dashboard for product and inventory management',
      'Set up Docker containerization for consistent development environment',
    ],
    contributions: [
      'Reduced API response time from 800ms to under 150ms with optimization',
      'Implemented MongoDB aggregation pipelines for complex catalog queries',
      'Added Redis caching layer reducing database load by 60%',
      'Achieved 95+ Lighthouse score with SSR and Cloudflare CDN',
    ],
  },

  timeline: {
    started: '2023',
    duration: '6 months',
  },

  images: [
    '/projects/xiraya/homepage.png',
    '/projects/xiraya/product-catalog.png',
    '/projects/xiraya/admin-dashboard.png',
  ],

  status: 'completed',

  features: [
    'Product catalog with categories and search',
    'Shopping cart with session management',
    'User authentication and profiles',
    'Order management and tracking',
    'Payment gateway integration',
    'Admin dashboard for inventory management',
    'Analytics and sales reporting',
    'SEO optimization with SSR',
    'Responsive design for all devices',
    'Cloudflare CDN for fast delivery',
  ],

  challenges: [
    {
      title: 'API Performance Optimization',
      description:
        'API response times were initially slow for product catalog queries with large datasets.',
      solution:
        'Implemented MongoDB aggregation pipelines for complex queries, added Redis caching layer for frequently accessed data, and optimized database indexes. Reduced API response time from 800ms to under 150ms.',
    },
    {
      title: 'Payment Gateway Integration',
      description:
        'Integrating secure payment processing while maintaining PCI compliance standards.',
      solution:
        'Implemented tokenization for payment data, used environment-specific API keys, and added comprehensive error handling with transaction logging for audit trails.',
    },
  ],

  category: 'web-app',
  tags: ['E-Commerce', 'Full-Stack', 'Laravel', 'Vue', 'MongoDB'],
};

/**
 * Pharmacy Management System
 */
export const pharmacySystem: Project = {
  id: 'pharmacy-management',
  slug: 'pharmacy-management',
  title: 'Pharmacy Management System',
  tagline: 'Hybrid Pharmacy Operations Platform',
  description:
    'Comprehensive pharmacy management system combining web-based administration with Windows POS application for complete pharmacy operations.',
  longDescription:
    'A hybrid solution designed for modern pharmacy operations, featuring a Laravel backend with React web dashboard for management tasks and a C# WinForms application for point-of-sale operations. The system manages inventory, sales, prescriptions, and reporting while maintaining HIPAA-compliant data handling.',
  featured: false,

  // Deployed for local pharmacy (private)

  techStack: [
    'Laravel',
    'React',
    'C# WinForms',
    'MySQL',
    'Docker',
    'TailwindCSS',
    'Chart.js',
  ],

  skills: ['Laravel', 'React', 'C#', 'MySQL', 'Docker', 'TailwindCSS'],

  role: {
    title: 'Full-Stack & Desktop Application Developer',
    teamSize: 'Solo project',
    responsibilities: [
      'Developed hybrid pharmacy management system (web + desktop applications)',
      'Built Laravel backend API with React admin dashboard',
      'Created Windows POS application using C# WinForms with barcode scanning',
      'Designed MySQL database schema with transaction integrity',
      'Implemented offline-first architecture with local SQLite cache',
      'Built real-time inventory sync between POS terminals and web dashboard',
      'Added HIPAA-compliant prescription management with audit logging',
    ],
    contributions: [
      'Enabled offline POS functionality with automatic sync when online',
      'Reduced inventory discrepancies by 95% with real-time WebSocket updates',
      'Improved transaction speed to under 100ms for POS operations',
      'Processed 50-100 daily transactions managing 1,000+ inventory items',
    ],
  },

  timeline: {
    started: '2022',
    duration: '8 months',
  },

  images: [
    '/projects/pharmacy/pos-system.png',
    '/projects/pharmacy/dashboard.png',
    '/projects/pharmacy/inventory.png',
  ],

  status: 'live',

  features: [
    'Real-time inventory management with automatic reorder alerts',
    'Point of Sale (POS) system with barcode scanning',
    'Prescription management and tracking',
    'Expiration date monitoring with automated alerts',
    'Batch and supplier management',
    'Multiple payment method support',
    'Daily sales reports and analytics',
    'Revenue and profit margin tracking',
    'Role-Based Access Control (cashier, pharmacist, manager)',
    'Shift management and activity logging',
    'Email notifications for low stock and expirations',
    'Receipt printing with customizable templates',
  ],

  challenges: [
    {
      title: 'Offline POS Functionality',
      description:
        'POS system needed to work during internet outages while maintaining data consistency when back online.',
      solution:
        'Built C# WinForms desktop app with local SQLite cache that syncs with central MySQL database when connection is restored. Implemented conflict resolution for simultaneous edits.',
    },
    {
      title: 'Inventory Accuracy',
      description:
        'Maintaining accurate real-time inventory across web dashboard and POS terminals.',
      solution:
        'Implemented optimistic locking, real-time WebSocket updates, and transaction-based inventory adjustments with automatic reconciliation reports.',
    },
    {
      title: 'Prescription Compliance',
      description: 'Ensuring proper handling of prescription data with regulatory compliance.',
      solution:
        'Added audit logging for all prescription activities, implemented role-based access with pharmacist verification requirements, and encrypted sensitive patient data.',
    },
  ],

  metrics: [
    { label: 'Daily Transactions', value: '50-100', description: 'Average transactions per day' },
    {
      label: 'Inventory Items',
      value: '1,000+',
      description: 'Products tracked in system',
    },
    {
      label: 'Response Time',
      value: '< 100ms',
      description: 'POS transaction speed',
    },
  ],

  category: 'desktop-app',
  tags: ['Pharmacy', 'POS', 'Inventory', 'Healthcare', 'Hybrid', 'Desktop', 'Web'],
};

/**
 * Cloud-Based Media & Metadata Management Platform
 */
export const mediaManagement: Project = {
  id: 'cloud-media-platform',
  slug: 'cloud-media-platform',
  title: 'Cloud Media & Metadata Management',
  tagline: 'Scalable Media Storage Solution',
  description:
    'Cloud-based platform for secure media storage and management using AWS S3 and DynamoDB with advanced metadata capabilities.',
  longDescription:
    'A serverless media management solution built on AWS infrastructure, providing secure storage, efficient metadata querying, and scalable media delivery. Designed for applications requiring robust media handling with fine-grained access control.',
  featured: false,

  // Client project (private)

  techStack: [
    'AWS S3',
    'DynamoDB',
    'AWS Lambda',
    'Fastify',
    'NestJS',
    'TypeScript',
    'Docker',
  ],

  skills: ['AWS', 'DynamoDB', 'NestJS', 'TypeScript', 'Docker'],

  role: {
    title: 'Backend & Cloud Engineer',
    teamSize: 'Solo project (client work)',
    responsibilities: [
      'Architected serverless media management platform on AWS infrastructure',
      'Designed DynamoDB schema with Global Secondary Indexes for efficient querying',
      'Built NestJS API backend with Fastify for high-performance requests',
      'Implemented S3 lifecycle policies for cost-optimized storage',
      'Created IAM role system with pre-signed URLs for secure temporary access',
      'Set up automated thumbnail generation with AWS Lambda',
      'Integrated CloudFront CDN for global media delivery',
    ],
    contributions: [
      'Reduced AWS costs by 40% with storage tier optimization',
      'Achieved sub-50ms metadata query latency with DynamoDB optimization',
      'Scaled platform to support 1,000+ concurrent users',
      'Implemented efficient caching reducing S3 bandwidth costs by 60%',
    ],
  },

  timeline: {
    started: '2024',
    duration: '4 months',
  },

  images: [
    '/projects/media-platform/architecture.png',
    '/projects/media-platform/dashboard.png',
  ],

  status: 'completed',

  features: [
    'Secure media upload to AWS S3',
    'Metadata storage and indexing in DynamoDB',
    'Advanced search and filtering',
    'Tag-based organization',
    'IAM role-based access control',
    'Pre-signed URLs for secure temporary access',
    'Automatic thumbnail generation',
    'Media transformation pipeline',
    'CDN integration for fast delivery',
    'Usage analytics and reporting',
  ],

  challenges: [
    {
      title: 'Cost Optimization',
      description: 'Managing AWS costs while maintaining performance for large media files.',
      solution:
        'Implemented S3 lifecycle policies to move infrequently accessed files to cheaper storage tiers, used CloudFront CDN to reduce S3 bandwidth costs, and optimized DynamoDB throughput with on-demand pricing.',
    },
    {
      title: 'Access Control Complexity',
      description:
        'Managing different permission levels for various user types and use cases.',
      solution:
        'Designed flexible IAM role system with pre-signed URLs for temporary access, implemented request signing for API authentication, and created permission inheritance model for organizational structures.',
    },
    {
      title: 'Metadata Query Performance',
      description: 'Fast querying of millions of media items by various metadata attributes.',
      solution:
        'Designed efficient DynamoDB schema with Global Secondary Indexes (GSI) for common query patterns, implemented caching layer for frequently accessed metadata, and used DynamoDB Streams for real-time updates.',
    },
  ],

  metrics: [
    { label: 'Storage Capacity', value: 'Scalable', description: 'Automatic scaling with S3' },
    { label: 'Query Latency', value: '< 50ms', description: 'DynamoDB metadata queries' },
    {
      label: 'Concurrent Users',
      value: '1,000+',
      description: 'Supported simultaneous access',
    },
  ],

  category: 'api',
  tags: ['AWS', 'Serverless', 'Media', 'Storage', 'Cloud', 'Scalable'],
};

/**
 * All Projects
 * Exported as array, sorted by featured status and timeline
 */
export const allProjects: Project[] = [
  campusConnect,
  xiraya,
  pharmacySystem,
  mediaManagement,
].sort((a, b) => {
  // Featured projects first
  if (a.featured && !b.featured) return -1;
  if (!a.featured && b.featured) return 1;

  // Then by launch date (newest first)
  const dateA = a.timeline.launched || a.timeline.started;
  const dateB = b.timeline.launched || b.timeline.started;

  return dateB.localeCompare(dateA);
});

/**
 * Get featured project (CampusConnect)
 */
export function getFeaturedProject(): Project {
  return campusConnect;
}

/**
 * Get projects by status
 */
export function getProjectsByStatus(status: Project['status']): Project[] {
  return allProjects.filter((project) => project.status === status);
}

/**
 * Get projects by tag
 */
export function getProjectsByTag(tag: string): Project[] {
  return allProjects.filter((project) => project.tags.includes(tag));
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}

/**
 * Get all unique tags across projects
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  allProjects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all unique tech stack items
 */
export function getAllTechStack(): string[] {
  const tech = new Set<string>();
  allProjects.forEach((project) => {
    project.techStack.forEach((item) => tech.add(item));
  });
  return Array.from(tech).sort();
}
