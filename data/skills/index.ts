/**
 * Skills Data
 * Comprehensive list of technical skills with proficiency levels and usage details
 */

import type { Skill, SkillCategory } from '@/types';

/**
 * Programming Languages
 */
const languages: Skill[] = [
  {
    name: 'PHP',
    proficiency: 70,
    experience: '4 years',
    usage:
      'Primary backend language for web applications, used extensively for building APIs, CRUD systems, and integrating with databases. Leveraged in Laravel projects for production-ready solutions. I appreciate PHP\'s flexibility and ecosystem, especially when combined with modern frameworks for building robust backend systems.',
    projects: ['CampusConnect', 'Pharmacy Management System', 'Xiraya'],
    category: 'languages',
    tags: ['backend', 'web', 'api'],
  },
  {
    name: 'JavaScript',
    proficiency: 70,
    experience: '4 years',
    usage:
      'Core language for front-end development and backend scripting (Node.js). Used for dynamic interfaces, asynchronous operations, and API integrations. JavaScript\'s versatility allows me to work across the entire stack, from interactive UIs to server-side logic. I leverage ES6+ features for cleaner, more maintainable code.',
    projects: ['CampusConnect', 'Xiraya', 'All web projects'],
    category: 'languages',
    tags: ['frontend', 'backend', 'fullstack'],
  },
  {
    name: 'TypeScript',
    proficiency: 65,
    experience: '2 years',
    usage:
      'Preferred language for modern web applications, providing type safety and better developer experience. Used extensively in Next.js and NestJS projects. TypeScript helps catch errors during development and makes refactoring significantly safer. The intellisense and autocomplete features dramatically improve productivity.',
    projects: ['CampusConnect', 'This Portfolio'],
    category: 'languages',
    tags: ['frontend', 'backend', 'type-safe'],
  },
  {
    name: 'Python',
    proficiency: 30,
    experience: '3 years',
    usage:
      'Used for scripting, automation, and experimental web/AI projects. Applied for backend logic and small-scale development. Python\'s readability and extensive library ecosystem make it my go-to for quick automation scripts and exploring new technologies.',
    projects: ['Personal scripts', 'Automation tools', 'Learning projects'],
    category: 'languages',
    tags: ['scripting', 'automation', 'ai'],
  },
  {
    name: 'C#',
    proficiency: 30,
    experience: '3 years',
    usage:
      'Learned through school curriculum and applied in small software projects. Used mainly for Windows applications and academic exercises. Utilized for building desktop applications, particularly POS systems where native Windows integration is required.',
    projects: ['Pharmacy Management System (POS)', 'Academic projects'],
    category: 'languages',
    tags: ['desktop', 'windows', 'pos'],
  },
  {
    name: 'SQL',
    proficiency: 90,
    experience: '4 years',
    usage:
      'Expert-level proficiency in relational database design and querying. Strong understanding of database normalization, indexing strategies, and query optimization. I design schemas with performance and data integrity in mind, utilizing foreign keys, transactions, and stored procedures where appropriate. Proficient in both MySQL and PostgreSQL.',
    projects: ['CampusConnect', 'Pharmacy Management System', 'Most backend projects'],
    category: 'languages',
    tags: ['database', 'backend', 'data'],
  },
];

/**
 * Frameworks & Libraries
 */
const frameworks: Skill[] = [
  {
    name: 'Next.js',
    proficiency: 60,
    experience: '2 years',
    usage:
      'Primary framework for building production web applications. Utilized Server Components and App Router for optimal performance and SEO. Applied extensively in CampusConnect to handle 3,000+ users with fast page loads and excellent developer experience. I leverage Next.js for its built-in optimizations like image optimization, font optimization, and automatic code splitting.',
    projects: ['CampusConnect', 'This Portfolio'],
    category: 'frameworks',
    tags: ['react', 'ssr', 'fullstack', 'seo'],
  },
  {
    name: 'React',
    proficiency: 60,
    experience: '2 years',
    usage:
      'Frontend library for building interactive UIs with component-based architecture, state management, and API integration. I use React for its declarative approach and rich ecosystem. Proficient in hooks, context API, and modern React patterns for state management and performance optimization.',
    projects: ['CampusConnect', 'Pharmacy Management System', 'Multiple projects'],
    category: 'frameworks',
    tags: ['frontend', 'ui', 'spa'],
  },
  {
    name: 'Laravel',
    proficiency: 75,
    experience: '3 years',
    usage:
      'Full-featured PHP framework for backend development. Leveraged for CRUD systems, authentication, relational database management, and integration with modern frontend frameworks. Laravel\'s elegant syntax and comprehensive feature set make it my most proficient backend framework. I utilize Eloquent ORM for database operations and leverage the framework\'s built-in authentication and authorization systems.',
    projects: ['CampusConnect (initial)', 'Pharmacy Management System', 'Xiraya'],
    category: 'frameworks',
    tags: ['php', 'backend', 'api', 'mvc'],
  },
  {
    name: 'NestJS',
    proficiency: 50,
    experience: '2 years',
    usage:
      'Backend framework for scalable APIs and microservices. Applied for structured backend architecture, REST API development, and integration with PostgreSQL and Supabase. NestJS\'s TypeScript-first approach and modular architecture align perfectly with my focus on maintainable, scalable backend systems.',
    projects: ['CampusConnect', 'API projects'],
    category: 'frameworks',
    tags: ['nodejs', 'backend', 'typescript', 'api'],
  },
  {
    name: 'Nuxt.js',
    proficiency: 45,
    experience: '1 year',
    usage:
      'Used for building scalable Vue-based applications with SSR and static generation for SEO-focused projects. Nuxt\'s convention-over-configuration approach and powerful module ecosystem make it great for rapid Vue application development.',
    projects: ['Xiraya', 'Personal experiments'],
    category: 'frameworks',
    tags: ['vue', 'ssr', 'seo'],
  },
  {
    name: 'React Native',
    proficiency: 40,
    experience: '1 year',
    usage:
      'Cross-platform mobile development for UI and native device integrations. React Native allows me to leverage my React knowledge for mobile app development. Used for building mobile versions of web applications and creating native-feeling mobile experiences.',
    projects: ['CampusConnect Mobile', 'Freelance apps'],
    category: 'frameworks',
    tags: ['mobile', 'react', 'cross-platform'],
  },
  {
    name: 'TailwindCSS',
    proficiency: 80,
    experience: '3 years',
    usage:
      'Utility-first CSS framework for fast, responsive, and modern UI development. Tailwind\'s utility-first approach dramatically speeds up my UI development process. I customize the Tailwind config to match design systems and leverage JIT mode for optimal performance. The framework\'s consistency and maintainability make it my preferred styling solution.',
    projects: ['CampusConnect', 'This Portfolio', 'Most modern projects'],
    category: 'frameworks',
    tags: ['css', 'ui', 'styling', 'responsive'],
  },
];

/**
 * Databases
 */
const databases: Skill[] = [
  {
    name: 'MongoDB',
    proficiency: 80,
    experience: '3 years',
    usage:
      'NoSQL database for scalable document storage. Applied in projects requiring flexible JSON-based storage and complex querying. MongoDB\'s schema flexibility and powerful aggregation framework make it ideal for projects with evolving data structures. I use it extensively for projects requiring horizontal scalability.',
    projects: ['CampusConnect', 'Xiraya', 'Multiple projects'],
    category: 'databases',
    tags: ['nosql', 'document', 'scalable'],
  },
  {
    name: 'PostgreSQL',
    proficiency: 90,
    experience: '4 years',
    usage:
      'Primary relational database for production applications. Expert in complex queries, indexing, transactions, and performance optimization. Use extensively with Supabase and Laravel projects. Strong understanding of ACID properties, database normalization, and query planning.',
    projects: ['CampusConnect', 'Pharmacy Management System', 'Most projects'],
    category: 'databases',
    tags: ['sql', 'relational', 'production'],
  },
  {
    name: 'MySQL',
    proficiency: 85,
    experience: '4 years',
    usage:
      'Reliable relational database for web applications. Proficient in database design, optimization, and administration. Used in Laravel projects and traditional LAMP stack applications. Experienced with replication, backup strategies, and performance tuning.',
    projects: ['Pharmacy Management System', 'Legacy projects', 'Freelance work'],
    category: 'databases',
    tags: ['sql', 'relational', 'web'],
  },
  {
    name: 'Supabase',
    proficiency: 100,
    experience: '3 years',
    usage:
      'Primary backend-as-a-service for modern web applications. Fully utilized for authentication, storage, and PostgreSQL management in CampusConnect. Supabase\'s open-source nature, PostgreSQL foundation, and comprehensive feature set make it my go-to BaaS solution. I leverage Row Level Security (RLS) for fine-grained access control and real-time subscriptions for live features.',
    projects: ['CampusConnect (primary backend)'],
    category: 'databases',
    tags: ['baas', 'postgresql', 'realtime', 'auth'],
  },
  {
    name: 'Firebase',
    proficiency: 60,
    experience: '2 years',
    usage:
      'Realtime database and authentication platform for rapid development and prototype apps. Firebase\'s real-time capabilities and easy authentication make it perfect for MVPs and projects requiring live data synchronization.',
    projects: ['Freelance projects', 'Prototypes'],
    category: 'databases',
    tags: ['nosql', 'realtime', 'baas'],
  },
  {
    name: 'DynamoDB',
    proficiency: 40,
    experience: '1 year',
    usage:
      'Serverless NoSQL database for high-scale projects. Used in AWS-based projects requiring low-latency, high-throughput data access. DynamoDB\'s single-digit millisecond latency and automatic scaling make it suitable for serverless architectures.',
    projects: ['Cloud Media Platform', 'Small projects'],
    category: 'databases',
    tags: ['nosql', 'aws', 'serverless'],
  },
];

/**
 * Cloud & DevOps
 */
const cloudDevOps: Skill[] = [
  {
    name: 'Docker',
    proficiency: 30,
    experience: '1 year',
    usage:
      'Containerization tool for isolated development and deployment environments. Docker ensures consistency across development, staging, and production environments. I use Docker Compose for orchestrating multi-container applications and create optimized Dockerfiles with multi-stage builds to reduce image sizes.',
    projects: ['CampusConnect', 'Pharmacy Management System'],
    category: 'cloud-devops',
    tags: ['containerization', 'devops', 'deployment'],
  },
  {
    name: 'AWS',
    proficiency: 30,
    experience: '1 year',
    usage:
      'Cloud infrastructure for hosting and file storage. Applied in small-scale production and freelance projects. Used EC2 for hosting web applications and S3 for scalable object storage. Implemented IAM roles for secure access management and utilized CloudWatch for monitoring.',
    projects: ['Cloud Media Platform', 'Freelance projects'],
    category: 'cloud-devops',
    tags: ['cloud', 'infrastructure', 'hosting'],
  },
  {
    name: 'Cloudflare',
    proficiency: 60,
    experience: '2 years',
    usage:
      'Used for CDN, DNS, and web security to optimize performance and protect applications. Cloudflare\'s edge network and security features significantly improve application performance and protect against DDoS attacks. I configure caching rules, page rules, and utilize Cloudflare Workers for edge computing when needed.',
    projects: ['CampusConnect', 'Multiple projects'],
    category: 'cloud-devops',
    tags: ['cdn', 'security', 'ddos', 'dns'],
  },
  {
    name: 'GitHub Actions',
    proficiency: 60,
    experience: '2 years',
    usage:
      'Automation for deployment pipelines, testing, and workflow management. GitHub Actions streamlines my development workflow by automating testing, building, and deployment processes. I create custom workflows for continuous integration and deployment, ensuring code quality and rapid deployment cycles.',
    projects: ['CampusConnect', 'This Portfolio', 'Multiple projects'],
    category: 'cloud-devops',
    tags: ['cicd', 'automation', 'deployment'],
  },
  {
    name: 'Vercel',
    proficiency: 70,
    experience: '2 years',
    usage:
      'Primary platform for deploying Next.js applications. Vercel\'s seamless integration with Next.js, automatic deployments, and edge network make it ideal for modern web applications. Used for both personal and production projects.',
    projects: ['CampusConnect (frontend)', 'This Portfolio'],
    category: 'cloud-devops',
    tags: ['hosting', 'deployment', 'nextjs'],
  },
  {
    name: 'Render',
    proficiency: 55,
    experience: '1.5 years',
    usage:
      'Platform for deploying backend services and full-stack applications. Used for NestJS APIs and other Node.js backend services. Render\'s simple deployment process and auto-scaling features make it great for backend hosting.',
    projects: ['CampusConnect (backend)'],
    category: 'cloud-devops',
    tags: ['hosting', 'backend', 'deployment'],
  },
];

/**
 * Tools & Workflow
 */
const tools: Skill[] = [
  {
    name: 'Git',
    proficiency: 90,
    experience: '4 years',
    usage:
      'Version control for collaboration, code management, and project workflow. Essential tool for all my projects. I follow Git Flow for larger projects and utilize branching strategies for feature development. Proficient in resolving merge conflicts, rebasing, and maintaining clean commit histories.',
    projects: ['All projects'],
    category: 'tools',
    tags: ['version-control', 'collaboration', 'workflow'],
  },
  {
    name: 'VS Code',
    proficiency: 95,
    experience: '4 years',
    usage:
      'Primary IDE with customized setup including extensions for productivity, debugging, and code quality. I\'ve optimized my VS Code environment with keybindings, snippets, and extensions for different tech stacks. Use daily for all development work.',
    projects: ['All projects'],
    category: 'tools',
    tags: ['ide', 'editor', 'productivity'],
  },
  {
    name: 'GSAP',
    proficiency: 50,
    experience: '2 years',
    usage:
      'Industry-standard JavaScript animation library for creating high-performance, smooth animations. Used for scroll-triggered animations, page transitions, and complex motion graphics. GSAP\'s timeline feature and ScrollTrigger plugin enable sophisticated animation sequences.',
    projects: ['This Portfolio', 'CampusConnect', 'Client websites'],
    category: 'tools',
    tags: ['animation', 'frontend', 'ui'],
  },
  {
    name: 'Figma',
    proficiency: 70,
    experience: '3 years',
    usage:
      'UI/UX design tool for creating mockups, prototypes, and design systems. Use for planning layouts, creating component libraries, and collaborating with clients on design decisions before implementation.',
    projects: ['CampusConnect design', 'Client projects', 'This Portfolio planning'],
    category: 'tools',
    tags: ['design', 'ui', 'ux', 'prototyping'],
  },
];

/**
 * Testing & Quality Assurance
 */
const testing: Skill[] = [
  {
    name: 'Selenium',
    proficiency: 40,
    experience: '1 year',
    usage:
      'Browser automation and end-to-end testing. Used for automated testing of web applications to ensure functionality across different browsers and scenarios.',
    projects: ['CampusConnect'],
    category: 'testing',
    tags: ['testing', 'automation', 'e2e'],
  },
  {
    name: 'Playwright',
    proficiency: 45,
    experience: '1 year',
    usage:
      'Modern end-to-end testing framework with cross-browser support. Playwright\'s speed and reliability make it ideal for comprehensive testing strategies.',
    projects: ['CampusConnect'],
    category: 'testing',
    tags: ['testing', 'automation', 'e2e'],
  },
  {
    name: 'Jest',
    proficiency: 50,
    experience: '2 years',
    usage:
      'JavaScript testing framework for unit and integration testing. Used for testing React components and backend logic. Configured with custom matchers and utilities for efficient testing.',
    projects: ['CampusConnect', 'Multiple projects'],
    category: 'testing',
    tags: ['testing', 'unit', 'javascript'],
  },
  {
    name: 'ESLint',
    proficiency: 70,
    experience: '3 years',
    usage:
      'Code quality tool for identifying and fixing JavaScript code issues. Configured with custom rules for maintaining consistent code style across projects. Essential part of development workflow.',
    projects: ['All JavaScript/TypeScript projects'],
    category: 'testing',
    tags: ['linting', 'code-quality', 'automation'],
  },
];

/**
 * AI & Automation
 */
const aiAutomation: Skill[] = [
  {
    name: 'OpenAI API',
    proficiency: 50,
    experience: '1 year',
    usage:
      'Integration of AI capabilities for intelligent features. Used for chatbots, content generation, and automated assistance in CampusConnect.',
    projects: ['CampusConnect'],
    category: 'other',
    tags: ['ai', 'automation', 'chatbot'],
  },
  {
    name: 'n8n',
    proficiency: 45,
    experience: '1 year',
    usage:
      'Workflow automation tool for creating complex automation pipelines without extensive coding. Used for integrating different services and automating repetitive tasks.',
    projects: ['CampusConnect integrations', 'Automation workflows'],
    category: 'other',
    tags: ['automation', 'workflow', 'integration'],
  },
];

/**
 * All Skills Combined
 * Exported as a single array for easy consumption
 */
export const allSkills: Skill[] = [
  ...languages,
  ...frameworks,
  ...databases,
  ...cloudDevOps,
  ...tools,
  ...testing,
  ...aiAutomation,
];

/**
 * Skills Grouped by Category
 * For categorized display
 */
export const skillsByCategory = {
  languages,
  frameworks,
  databases,
  cloudDevOps,
  tools,
  testing,
  aiAutomation,
};

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return allSkills.filter((skill) => skill.category === category);
}

/**
 * Get skills by name (for project linking)
 */
export function getSkillsByNames(names: string[]): Skill[] {
  return allSkills.filter((skill) => names.includes(skill.name));
}

/**
 * Get top skills by proficiency
 */
export function getTopSkills(limit: number = 10): Skill[] {
  return [...allSkills].sort((a, b) => b.proficiency - a.proficiency).slice(0, limit);
}

/**
 * Search skills by keyword
 */
export function searchSkills(query: string): Skill[] {
  const lowerQuery = query.toLowerCase();
  return allSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(lowerQuery) ||
      skill.usage.toLowerCase().includes(lowerQuery) ||
      skill.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
