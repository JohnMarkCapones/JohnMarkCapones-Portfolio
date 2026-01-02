# Portfolio - John Mark Capones

> Professional portfolio showcasing expertise in Full-Stack Development, DevOps, and Cloud Engineering

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

## 🎯 Overview

An extravagant yet professional portfolio website built with modern web technologies, featuring:

- 🎨 **Industrial/Utilitarian Design** with editorial structure and playful interactions
- 🚀 **Exceptional Performance** - Mobile-first, optimized for Lighthouse scores 95+
- ✨ **Advanced Animations** - GSAP, Framer Motion, and 3D effects
- 🔐 **Production-Ready** - TypeScript strict mode, ESLint, Prettier
- ♿ **Accessible** - WCAG AA compliant
- 📱 **Responsive** - Seamless experience across all devices

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript 5.9** - Type-safe development with strict mode

### Styling & Design
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **CSS Modules** - Component-scoped styles
- **Custom Design System** - Tokens, variables, and utilities

### Animation Libraries
- **GSAP 3** + ScrollTrigger - Professional-grade animations
- **Framer Motion 12** - React-native animations
- **React Three Fiber** (planned) - 3D graphics with Three.js
- **Lottie** (planned) - Icon and micro-animations

### UI Components
- **Radix UI** - Accessible component primitives
- **class-variance-authority** - Component variants
- **clsx** + **tailwind-merge** - Conditional class merging

### Code Quality
- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting with Tailwind plugin
- **TypeScript strict** - Maximum type safety

### Deployment & Performance
- **Vercel** (recommended) - Optimized for Next.js
- **Image Optimization** - AVIF, WebP with next/image
- **Font Optimization** - next/font with Google Fonts

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts & metadata
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles & CSS variables
│   └── (routes)/          # Route groups (to be added)
│
├── components/            # React components
│   ├── ui/               # Base UI components (buttons, cards, etc.)
│   ├── sections/         # Page sections (hero, projects, etc.)
│   ├── navigation/       # Navigation components
│   └── animations/       # Animation wrappers
│
├── lib/                  # Utilities and configurations
│   ├── utils/           # Utility functions
│   │   ├── cn.ts        # className merger
│   │   └── index.ts     # Exports
│   └── constants/       # App constants and config
│       └── index.ts     # Site config, nav items, etc.
│
├── types/               # TypeScript type definitions
│   └── index.ts        # Centralized types
│
├── data/               # Static data and content
│   ├── projects/      # Project information
│   └── skills/        # Skills and technologies
│
├── hooks/             # Custom React hooks
├── utils/             # Additional utilities
├── config/            # Configuration files
├── public/            # Static assets
│
├── PLAN.md           # Comprehensive project plan
├── ROADMAP.md        # Development roadmap
├── CONTENT_DATA.md   # Personal information & content
└── README.md         # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18 or later
- **npm** 9.x or later (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnMarkCapones/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript compiler check
npm run clean        # Clean build artifacts
```

## 🎨 Design System

### Color Palette

```css
/* Primary */
--color-primary: #00D9FF (Cyan)

/* Accent Colors */
--color-accent-green: #00FF94
--color-accent-amber: #FFB800
--color-accent-red: #FF4444

/* Surface */
--color-surface-primary: #0A0A0A (near black)
--color-surface-secondary: #151515
--color-surface-tertiary: #1F1F1F

/* Text */
--color-text-primary: #F0F0F0
--color-text-secondary: #A0A0A0
--color-text-tertiary: #606060
```

### Typography

- **Headings:** Space Grotesk (geometric, modern)
- **Body:** Inter (readable, professional)
- **Code:** JetBrains Mono (monospace)

### Spacing & Rhythm

- **Base Unit:** 4px (0.25rem)
- **Container Max Width:** 1280px (7xl)
- **Section Spacing:** 64px - 128px (responsive)

## 🎯 Features

### Current (Phase 1 - Complete)
- ✅ Next.js 15 setup with TypeScript
- ✅ Tailwind CSS configuration with custom design system
- ✅ Professional folder structure
- ✅ Type-safe development environment
- ✅ Code quality tools (ESLint, Prettier)
- ✅ Font optimization (next/font)
- ✅ SEO metadata configuration
- ✅ Responsive base layout

### Upcoming (Phase 2-6)
- 🔄 Terminal + Particle landing page
- 🔄 Interactive resume (code editor style)
- 🔄 Project showcase with bento grid
- 🔄 Command palette navigation (⌘K)
- 🔄 Floating dock navigation (mobile)
- 🔄 Advanced GSAP scroll animations
- 🔄 Metrics dashboard
- 🔄 Easter eggs (Konami code, console commands)
- 🔄 GitHub API integration
- 🔄 Dark mode with Matrix theme

## 📈 Performance Targets

- **Lighthouse Score:** 95+ (mobile), 98+ (desktop)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation support
- Screen reader tested
- Focus indicators
- Reduced motion support
- High contrast mode support

## 🔒 Security

- Content Security Policy headers
- XSS protection
- CSRF protection
- Secure headers configuration
- Input validation and sanitization

## 📝 Development Guidelines

### Code Style

- **TypeScript:** Strict mode enabled
- **Naming:** camelCase for variables, PascalCase for components
- **Imports:** Absolute imports with @ alias
- **Components:** Function components with TypeScript
- **Styling:** Tailwind classes, utility-first approach

### Git Workflow

1. Create feature branch from `main`
2. Make changes with descriptive commits
3. Run linting and type checking
4. Test thoroughly
5. Create pull request
6. Merge after review

### Commit Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
perf: Performance improvements
test: Add tests
chore: Maintenance tasks
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Configure build settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Add environment variables** (if needed)
4. **Deploy** automatically on push

### Alternative Platforms

- **Netlify:** Configure build command and publish directory
- **Cloudflare Pages:** Set up build configuration
- **Self-hosted:** Build with `npm run build` and serve `.next`

## 📊 Project Status

**Current Phase:** Phase 1 - Foundation Complete ✅

See [ROADMAP.md](./ROADMAP.md) for detailed development plan and progress tracking.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 👤 Author

**John Mark Capones**

- **Website:** [CapDev.tech](https://capdev.tech)
- **GitHub:** [@JohnMarkCapones](https://github.com/JohnMarkCapones)
- **LinkedIn:** [john-mark-capones](https://www.linkedin.com/in/john-mark-capones-66b6b8255/)
- **Email:** johnmarkcapones1@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment platform
- Open source community for incredible tools

---

**Built with ❤️ and lots of energy drinks ⚡**

*Last Updated: December 30, 2025*
