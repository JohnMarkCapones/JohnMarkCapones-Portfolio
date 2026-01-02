/**
 * Console Art & Messages
 * Fun messages for developers who inspect the site
 */

/**
 * ASCII Art Logo
 */
const ASCII_LOGO = `
   ██████╗ █████╗ ██████╗ ██████╗ ███████╗██╗   ██╗
  ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║   ██║
  ██║     ███████║██████╔╝██║  ██║█████╗  ██║   ██║
  ██║     ██╔══██║██╔═══╝ ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ╚██████╗██║  ██║██║     ██████╔╝███████╗ ╚████╔╝
   ╚═════╝╚═╝  ╚═╝╚═╝     ╚═════╝ ╚══════╝  ╚═══╝
`;

/**
 * Console styles
 */
const STYLES = {
  title: 'color: #00FF9F; font-size: 16px; font-weight: bold;',
  subtitle: 'color: #00D9FF; font-size: 14px;',
  text: 'color: #A0A0A0; font-size: 12px;',
  link: 'color: #00FF9F; font-size: 12px; text-decoration: underline;',
  command: 'color: #FFB800; font-size: 12px; font-family: monospace; background: #1A1A1A; padding: 2px 6px; border-radius: 3px;',
  success: 'color: #00FF9F; font-size: 12px; font-weight: bold;',
  emoji: 'font-size: 20px;',
};

/**
 * Print console messages
 */
export function printConsoleMessages(): void {
  if (typeof window === 'undefined') return;

  // Clear console for clean slate
  console.clear();

  // ASCII Art
  console.log(`%c${ASCII_LOGO}`, 'color: #00FF9F; font-family: monospace;');

  // Welcome message
  console.log(
    '%c👋 Hey there, fellow developer!',
    STYLES.title
  );

  console.log(
    '%cWelcome to my portfolio. Glad to see you poking around!',
    STYLES.text
  );

  console.log('\n');

  // Tech stack
  console.log('%c🛠️ Built with:', STYLES.subtitle);
  console.log(
    '%c• Next.js 16 (App Router)\n• TypeScript 5.9\n• Tailwind CSS 3\n• Framer Motion 12\n• React 19',
    STYLES.text
  );

  console.log('\n');

  // Easter eggs hint
  console.log('%c🎮 Easter Eggs Available:', STYLES.subtitle);
  console.log(
    '%cTry the Konami Code on the homepage → %c↑ ↑ ↓ ↓ ← → ← → B A',
    STYLES.text,
    STYLES.command
  );
  console.log(
    '%cType hidden commands in the terminal → %csudo%c, %chack%c, %cmatrix%c, %csecret',
    STYLES.text,
    STYLES.command,
    STYLES.text,
    STYLES.command,
    STYLES.text,
    STYLES.command,
    STYLES.text,
    STYLES.command
  );

  console.log('\n');

  // Hiring message
  console.log('%c💼 Looking to hire?', STYLES.subtitle);
  console.log(
    '%cI\'m available for freelance work (15-20 hrs/week)',
    STYLES.text
  );
  console.log(
    '%cExpected graduation: June 2026',
    STYLES.text
  );
  console.log(
    '%c📧 johnmarkcapones1@gmail.com',
    STYLES.link
  );

  console.log('\n');

  // Source code
  console.log('%c📦 Source Code:', STYLES.subtitle);
  console.log(
    '%cView the source → %chttps://github.com/JohnMarkCapones',
    STYLES.text,
    STYLES.link
  );

  console.log('\n');

  // Fun message
  console.log(
    '%c✨ Thanks for checking out the console! Here\'s a cookie: 🍪',
    STYLES.success
  );

  console.log('\n');
  console.log('%c─'.repeat(60), 'color: #2A2A2A;');
}

/**
 * Log easter egg discovery
 */
export function logEasterEgg(name: string, description: string): void {
  console.log(
    `%c🎉 Easter Egg Found: %c${name}`,
    STYLES.success,
    STYLES.title
  );
  console.log(`%c${description}`, STYLES.text);
}

/**
 * Log achievement
 */
export function logAchievement(achievement: string): void {
  console.log(
    `%c🏆 Achievement Unlocked: %c${achievement}`,
    STYLES.success,
    STYLES.command
  );
}

/**
 * Utility functions for fun console commands
 */
export const consoleCommands = {
  /**
   * Print all available console commands
   */
  help() {
    console.log('%c📖 Available Console Commands:', STYLES.subtitle);
    console.log('%cType these in the console:', STYLES.text);
    console.log('%c  help()%c       - Show this help', STYLES.command, STYLES.text);
    console.log('%c  hire()%c       - Contact information', STYLES.command, STYLES.text);
    console.log('%c  stack()%c      - View tech stack', STYLES.command, STYLES.text);
    console.log('%c  secrets()%c    - Hint about easter eggs', STYLES.command, STYLES.text);
  },

  /**
   * Display hiring info
   */
  hire() {
    console.log('%c💼 Let\'s work together!', STYLES.title);
    console.log('%cEmail: johnmarkcapones1@gmail.com', STYLES.link);
    console.log('%cGitHub: github.com/JohnMarkCapones', STYLES.link);
    console.log('%cLinkedIn: linkedin.com/in/john-mark-capones', STYLES.link);
    console.log('%cAvailability: 15-20 hrs/week (Freelance)', STYLES.text);
  },

  /**
   * Display tech stack
   */
  stack() {
    console.log('%c🛠️ Tech Stack:', STYLES.title);
    console.log('%cFrontend: Next.js 16, React 19, TypeScript 5.9', STYLES.text);
    console.log('%cStyling: Tailwind CSS 3, Framer Motion 12', STYLES.text);
    console.log('%cBackend: Supabase, PostgreSQL', STYLES.text);
    console.log('%cDevOps: Docker, AWS, Vercel', STYLES.text);
  },

  /**
   * Hint about secrets
   */
  secrets() {
    console.log('%c🔍 Looking for secrets?', STYLES.title);
    console.log('%c1. Try the Konami Code (↑↑↓↓←→←→BA)', STYLES.text);
    console.log('%c2. Check the terminal for hidden commands', STYLES.text);
    console.log('%c3. Look for Matrix references everywhere', STYLES.text);
    console.log('%c4. Keep exploring... there\'s more! 👀', STYLES.text);
  },
};

/**
 * Make commands globally available
 */
export function exposeConsoleCommands(): void {
  if (typeof window === 'undefined') return;

  // Expose commands to window object
  (window as any).help = consoleCommands.help;
  (window as any).hire = consoleCommands.hire;
  (window as any).stack = consoleCommands.stack;
  (window as any).secrets = consoleCommands.secrets;
}
