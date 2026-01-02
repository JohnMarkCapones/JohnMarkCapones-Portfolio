/**
 * Resume Files
 * Resume data formatted as various configuration files
 */

import { personalInfo, education, socialLinks } from '@/data/personal';
import { allSkills, getTopSkills } from '@/data/skills';
import { allProjects } from '@/data/projects';
import { timelineEvents } from '@/data/timeline';

// Helper to get social link by name
const github = socialLinks.find((s) => s.name === 'GitHub')!;
const linkedin = socialLinks.find((s) => s.name === 'LinkedIn')!;

// Helper to group skills by category
function getAllSkillsGrouped() {
  const categories = ['languages', 'frameworks', 'databases', 'cloud-devops', 'tools', 'testing'] as const;
  const grouped: Record<string, typeof allSkills> = {};
  categories.forEach((cat) => {
    grouped[cat] = allSkills.filter((s) => s.category === cat);
  });
  return grouped;
}

/**
 * File Structure Item
 */
export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: string;
  icon?: string;
  content?: string;
  children?: FileItem[];
}

/**
 * Generate README.md content
 */
function generateReadme(): string {
  return `# ${personalInfo.name}

> ${personalInfo.title}

## 👋 Introduction

${personalInfo.bio}

## 🚀 Quick Stats

- **Location:** ${personalInfo.location}
- **Education:** ${education[0]?.degree} at ${education[0]?.institution}
- **Expected Graduation:** ${education[0]?.expectedGraduation}
- **Availability:** ${personalInfo.availability === 'open-to-freelance' ? 'Open to Freelance' : 'Available'}

## 🎯 Current Goals

${personalInfo.careerGoals}

## 📚 Currently Learning

${personalInfo.currentlyLearning.map((item) => `- ${item}`).join('\n')}

## 📫 Get in Touch

- **Email:** ${personalInfo.email}
- **GitHub:** [@${github.username}](${github.url})
- **LinkedIn:** [${linkedin.username}](${linkedin.url})

## 🌟 Featured Project

**${allProjects[0]?.title}** - ${allProjects[0]?.tagline}

${allProjects[0]?.description}

---

*Last updated: ${new Date().toLocaleDateString()}*
`;
}

/**
 * Generate resume.json content
 */
function generateResumeJSON(): string {
  const resume = {
    $schema: 'https://json.schemastore.org/resume',
    basics: {
      name: personalInfo.name,
      label: personalInfo.title,
      email: personalInfo.email,
      url: personalInfo.website,
      summary: personalInfo.bio,
      location: {
        city: personalInfo.location.split(', ')[0],
        countryCode: 'PH',
      },
      profiles: [
        {
          network: 'GitHub',
          username: github.username,
          url: github.url,
        },
        {
          network: 'LinkedIn',
          username: linkedin.username,
          url: linkedin.url,
        },
      ],
    },
    work: allProjects
      .filter((p) => p.featured)
      .map((p) => ({
        name: p.title,
        position: 'Developer',
        startDate: p.timeline.started,
        endDate: p.timeline.launched || 'Present',
        summary: p.description,
        highlights: p.features || [],
      })),
    education: education.map((ed) => ({
      institution: ed.institution,
      area: ed.field,
      studyType: ed.degree,
      startDate: ed.startYear?.toString(),
      endDate: ed.expectedGraduation,
    })),
    skills: Object.entries(getAllSkillsGrouped()).map(([category, skills]) => ({
      name: category,
      keywords: skills.map((s) => s.name),
    })),
    projects: allProjects.map((p) => ({
      name: p.title,
      description: p.description,
      keywords: p.techStack,
      startDate: p.timeline.started,
      endDate: p.timeline.launched,
      url: p.liveUrl,
      roles: ['Developer'],
      type: 'application',
    })),
  };

  return JSON.stringify(resume, null, 2);
}

/**
 * Generate skills.ts content
 */
function generateSkillsTS(): string {
  const topSkills = getTopSkills(10);

  return `/**
 * Technical Skills
 * Core technologies and tools
 */

export interface Skill {
  name: string;
  proficiency: number;
  experience: string;
  category: string;
}

export const skills: Skill[] = [
${topSkills
  .map(
    (skill) => `  {
    name: '${skill.name}',
    proficiency: ${skill.proficiency},
    experience: '${skill.experience}',
    category: '${skill.category}',
  }`
  )
  .join(',\n')}
];

export const skillCategories = {
${Object.entries(getAllSkillsGrouped())
  .map(
    ([category, skills]) =>
      `  ${category}: [${skills.map((s) => `'${s.name}'`).join(', ')}]`
  )
  .join(',\n')}
};

// Total skills: ${allSkills.length}
// Average proficiency: ${Math.round(allSkills.reduce((sum, s) => sum + s.proficiency, 0) / allSkills.length)}%
`;
}

/**
 * Generate experience.md content
 */
function generateExperienceMD(): string {
  return `# Work Experience

${allProjects
  .filter((p) => p.featured)
  .map(
    (p) => `## ${p.title}

**Timeline:** ${p.timeline.started} - ${p.timeline.launched || 'Present'}

${p.description}

### Key Features

${p.features?.map((f) => `- ${f}`).join('\n') || '- No features listed'}

### Tech Stack

${p.techStack.map((t) => `- ${t}`).join('\n')}

${
  p.metrics
    ? `### Metrics

${p.metrics.map((m) => `- **${m.label}:** ${m.value}`).join('\n')}`
    : ''
}

---
`
  )
  .join('\n')}
`;
}

/**
 * Generate education.yaml content
 */
function generateEducationYAML(): string {
  const currentEd = education[0];
  if (!currentEd) return '# No education data available';

  return `# Education Configuration
# Academic background and achievements

education:
  current:
    degree: "${currentEd.degree}"
    field: "${currentEd.field}"
    institution: "${currentEd.institution}"
    start_year: ${currentEd.startYear}
    expected_graduation: "${currentEd.expectedGraduation}"
    status: "${currentEd.status}"

  achievements:
${currentEd.achievements?.map((a) => `    - "${a}"`).join('\n') || '    - No achievements listed'}

# Timeline
milestones:
${timelineEvents
  .filter((e) => e.type === 'education' || e.type === 'achievement')
  .map(
    (e) => `  - year: ${e.year}
    ${e.month ? `month: ${e.month}` : ''}
    title: "${e.title}"
    type: "${e.type}"`
  )
  .join('\n')}
`;
}

/**
 * Generate projects.config.js content
 */
function generateProjectsConfigJS(): string {
  return `/**
 * Projects Configuration
 * All projects and their metadata
 */

module.exports = {
  projects: [
${allProjects
  .map(
    (p) => `    {
      id: '${p.id}',
      title: '${p.title}',
      tagline: '${p.tagline}',
      status: '${p.status}',
      featured: ${p.featured},
      ${p.users ? `users: ${p.users},` : ''}
      techStack: [${p.techStack.map((t) => `'${t}'`).join(', ')}],
      timeline: {
        started: '${p.timeline.started}',
        ${p.timeline.launched ? `launched: '${p.timeline.launched}',` : ''}
      },
      ${p.liveUrl ? `liveUrl: '${p.liveUrl}',` : ''}
      ${p.githubUrl ? `githubUrl: '${p.githubUrl}',` : ''}
    }`
  )
  .join(',\n')}
  ],

  totalProjects: ${allProjects.length},
  liveProjects: ${allProjects.filter((p) => p.status === 'live').length},
  featuredProjects: ${allProjects.filter((p) => p.featured).length},
};
`;
}

/**
 * Generate contact.env content
 */
function generateContactENV(): string {
  return `# Contact Information
# Environment variables for connecting with me

# Personal
NAME="${personalInfo.name}"
EMAIL="${personalInfo.email}"
LOCATION="${personalInfo.location}"
WEBSITE="${personalInfo.website}"
TIMEZONE="Asia/Manila"

# Social Media
GITHUB_URL="${github.url}"
GITHUB_USERNAME="${github.username}"
LINKEDIN_URL="${linkedin.url}"
LINKEDIN_USERNAME="${linkedin.username}"

# Status
AVAILABILITY="${personalInfo.availability}"
CAREER_GOALS="${personalInfo.careerGoals || 'Seeking opportunities'}"
OPEN_TO_OPPORTUNITIES=true

# Preferences
PREFERRED_CONTACT_METHOD="email"
RESPONSE_TIME="24-48 hours"
`;
}

/**
 * Generate package.json content
 */
function generatePackageJSON(): string {
  const pkg = {
    name: personalInfo.name.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: personalInfo.bio,
    author: {
      name: personalInfo.name,
      email: personalInfo.email,
      url: personalInfo.website,
    },
    keywords: [
      'developer',
      'full-stack',
      'devops',
      'cloud-engineer',
      ...getTopSkills(5).map((s) => s.name.toLowerCase()),
    ],
    homepage: personalInfo.website,
    repository: {
      type: 'git',
      url: github.url,
    },
    license: 'MIT',
    scripts: {
      start: 'echo "Starting career journey..."',
      build: 'echo "Building amazing projects..."',
      test: 'echo "Testing new technologies..."',
      deploy: 'echo "Deploying to production..."',
    },
    dependencies: {
      coffee: '^999.0.0',
      'problem-solving': '^10.0.0',
      'continuous-learning': '^1.0.0',
      passion: 'latest',
    },
    devDependencies: {
      debugging: '^5.0.0',
      'google-search': '^100.0.0',
      'stack-overflow': '^50.0.0',
    },
  };

  return JSON.stringify(pkg, null, 2);
}

/**
 * All resume files
 */
export const resumeFiles: FileItem[] = [
  {
    id: 'root',
    name: 'john-mark-capones',
    type: 'folder',
    children: [
      {
        id: 'readme',
        name: 'README.md',
        type: 'file',
        language: 'markdown',
        icon: '📄',
        content: generateReadme(),
      },
      {
        id: 'resume',
        name: 'resume.json',
        type: 'file',
        language: 'json',
        icon: '📋',
        content: generateResumeJSON(),
      },
      {
        id: 'skills',
        name: 'skills.ts',
        type: 'file',
        language: 'typescript',
        icon: '⚡',
        content: generateSkillsTS(),
      },
      {
        id: 'experience',
        name: 'experience.md',
        type: 'file',
        language: 'markdown',
        icon: '💼',
        content: generateExperienceMD(),
      },
      {
        id: 'education',
        name: 'education.yaml',
        type: 'file',
        language: 'yaml',
        icon: '🎓',
        content: generateEducationYAML(),
      },
      {
        id: 'projects',
        name: 'projects.config.js',
        type: 'file',
        language: 'javascript',
        icon: '🚀',
        content: generateProjectsConfigJS(),
      },
      {
        id: 'contact',
        name: 'contact.env',
        type: 'file',
        language: 'env',
        icon: '📧',
        content: generateContactENV(),
      },
      {
        id: 'package',
        name: 'package.json',
        type: 'file',
        language: 'json',
        icon: '📦',
        content: generatePackageJSON(),
      },
    ],
  },
];

/**
 * Get file by ID
 */
export function getFileById(id: string): FileItem | undefined {
  const findFile = (items: FileItem[]): FileItem | undefined => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findFile(item.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  return findFile(resumeFiles);
}

/**
 * Get all files (flat list)
 */
export function getAllFiles(): FileItem[] {
  const files: FileItem[] = [];
  const traverse = (items: FileItem[]) => {
    items.forEach((item) => {
      if (item.type === 'file') {
        files.push(item);
      }
      if (item.children) {
        traverse(item.children);
      }
    });
  };

  traverse(resumeFiles);
  return files;
}
